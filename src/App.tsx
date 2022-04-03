import React, {useCallback, useEffect} from 'react';
import './App.css';
import {Todolist} from "./component/todolist/Todolist";
import {AddItemForm} from "./component/addItem/AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from '@material-ui/icons';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {
    ChangeTodoFilterAC,
    createTodoTC, fetchTodosTC,
    removeTodoTC,
    TodolistStateType, updateTodoTitleTC
} from "./state/todolists-reducer";
import {
    addTaskTC,
    removeTaskTC, updateTaskStatus, updateTaskTitle
} from "./state/tasks-reducer";
import {TaskDomainType, TaskStatuses} from "./api/todolist-api";

export type FilterType = 'all' | 'active' | 'completed'
export type TasksStateType = {
    [key: string]: Array<TaskDomainType>
}

export const App = () => {

    useEffect(()=>{
       dispatch(fetchTodosTC())
    },[])

    const todolists = useSelector<AppRootStateType, Array<TodolistStateType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    const dispatch = useDispatch()

    const deleteTodolist = useCallback((todolistId: string) => {
        dispatch(removeTodoTC(todolistId))
    },[dispatch])
    const changeStatus = useCallback((todolistId: string, taskId: string, value: TaskStatuses) => {
        debugger
        dispatch(updateTaskStatus(todolistId, taskId, value))
    },[dispatch])
    const deleteTask = useCallback((todolistId: string, taskId: string) => {
        dispatch(removeTaskTC(todolistId, taskId))
    },[dispatch])
    const addTask = useCallback((todolistId: string, title: string) => {
        dispatch(addTaskTC(todolistId, title))
    },[dispatch])
    const changeFilter = useCallback((todolistId: string, value: FilterType) => {
        dispatch(ChangeTodoFilterAC(todolistId, value))
    },[dispatch])
    const addTodolist = useCallback((title: string) => {
        dispatch(createTodoTC(title))
    },[dispatch])
    const changeTasktitle = useCallback((todolistId: string, taskId: string, title: string) => {
        dispatch(updateTaskTitle(todolistId, taskId, title))
    },[dispatch])
    const changeTodolistTitle = useCallback((todolistId: string, title: string) => {
        dispatch(updateTodoTitleTC(todolistId, title))
    },[dispatch])
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


                        return <Grid item>
                            <Paper style={{padding: '10px'}}>
                                <Todolist key={tl.id}
                                          id={tl.id}
                                          title={tl.title}
                                          tasks={tasks[tl.id]}
                                          deleteTask={deleteTask}
                                          filter={tl.filter}
                                          changeFilter={changeFilter}
                                          addTask={addTask}
                                          changeStatus={changeStatus}
                                          deleteTodolist={deleteTodolist}
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
