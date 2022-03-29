import React from 'react';
import './App.css';
import {Todolist} from "./component/todolist/Todolist";
import {AddItemForm} from "./component/addItem/AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from '@material-ui/icons';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {AddTodoAC, ChangeTodoFilterAC, ChangeTodoTitleAC, RemoveTodoAC} from "./state/todolists-reducer";
import {AddTaskAC, ChangeTaskStatusAC, ChangeTaskTitleAC, RemoveTaskAC} from "./state/tasks-reducer";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type FilterType = 'all' | 'active' | 'completed'
export type TodolistType = {
    id: string
    title: string
    filter: FilterType
}
export type TasksStateType = {
    [key: string]: Array<TaskType>
}

export const App = () => {
    const todolists = useSelector<AppRootStateType, Array<TodolistType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    const dispatch = useDispatch()

    const deleteTodolist = (todolistId: string) => {
        dispatch(RemoveTodoAC(todolistId))
    }
    const changeStatus = (todolistId: string, taskId: string, value: boolean) => {
        dispatch(ChangeTaskStatusAC(todolistId, taskId, value))
    }
    const deleteTask = (todolistId: string, taskId: string) => {
        dispatch(RemoveTaskAC(todolistId, taskId))
    }
    const addTask = (todolistId: string, title: string) => {
        dispatch(AddTaskAC(todolistId, title))
    }
    const changeFilter = (todolistId: string, value: FilterType) => {
        dispatch(ChangeTodoFilterAC(todolistId, value))
    }
    const addTodolist = (title: string) => {
        dispatch(AddTodoAC(title))
    }
    const changeTasktitle = (todolistId: string, taskId: string, title: string) => {
        dispatch(ChangeTaskTitleAC(todolistId, taskId, title))
    }
    const changeTodolistTitle = (todolistId: string, title: string) => {
        dispatch(ChangeTodoTitleAC(todolistId, title))
    }
    return (
        <div className="App">
            <AppBar position="sticky">
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: '20px'}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={3}>
                    {todolists.map(tl => {
                        let taskForTodolist = tasks[tl.id]
                        if (tl.filter === "active") {
                            taskForTodolist = tasks[tl.id].filter(t => !t.isDone)
                        }
                        if (tl.filter === "completed") {
                            taskForTodolist = tasks[tl.id].filter(t => t.isDone)
                        }
                        return <Grid item>
                            <Paper style={{padding: '10px'}}>
                                <Todolist key={tl.id}
                                          id={tl.id}
                                          title={tl.title}
                                          tasks={taskForTodolist}
                                          deleteTask={deleteTask}
                                          filter={tl.filter}
                                          changeFilter={changeFilter}
                                          addTask={addTask}
                                          changeStatus={changeStatus}
                                          deleteTodolists={deleteTodolist}
                                          onChangeTaskTitle={changeTasktitle}
                                          changeTodolistTitle={changeTodolistTitle}
                                />
                            </Paper>
                        </Grid>
                    })}
                </Grid>
            </Container>
        </div>
    );
}
