import React, {useCallback, useEffect} from 'react';
import './App.css';
import {Todolist} from "../todolist/Todolist";
import {AddItemForm} from "../addItem/AddItemForm";
import {Menu} from '@material-ui/icons';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../state/store";
import {
    ChangeTodoFilterAC,
    createTodoTC,
    fetchTodosTC,
    removeTodoTC,
    TodolistStateType,
    updateTodoTitleTC
} from "../../state/todolists-reducer";
import {addTaskTC, removeTaskTC, updateTaskModelTC} from "../../state/tasks-reducer";
import {FilterType, TasksStateType, TaskStatuses} from '../../typing/typing';
import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import Button from '@material-ui/core/Button';
import LinearProgress from "@material-ui/core/LinearProgress";
import Typography from '@material-ui/core/Typography/Typography';
import Grid from '@material-ui/core/Grid';
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Toolbar from "@material-ui/core/Toolbar";
import {RequestStatusType} from "./app-reducer";
import {ErrorSnackbar} from "../errorSnackbar/ErrorSnackbar";



export const App = () => {

    const todolists = useSelector<AppRootStateType, Array<TodolistStateType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    const status = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchTodosTC())
    }, [])

    const deleteTodolist = useCallback((todolistId: string) => {
        dispatch(removeTodoTC(todolistId))
    }, [dispatch])
    const changeStatus = useCallback((todolistId: string, taskId: string, value: TaskStatuses) => {
        dispatch(updateTaskModelTC(todolistId, taskId, {status: value}))
    }, [dispatch])
    const deleteTask = useCallback((todolistId: string, taskId: string) => {
        dispatch(removeTaskTC(todolistId, taskId))
    }, [dispatch])
    const addTask = useCallback((todolistId: string, title: string) => {
        dispatch(addTaskTC(todolistId, title))
    }, [dispatch])
    const changeFilter = useCallback((todolistId: string, value: FilterType) => {
        dispatch(ChangeTodoFilterAC(todolistId, value))
    }, [dispatch])
    const addTodolist = useCallback((title: string) => {
        dispatch(createTodoTC(title))
    }, [dispatch])
    const changeTasktitle = useCallback((todolistId: string, taskId: string, title: string) => {
        dispatch(updateTaskModelTC(todolistId, taskId, {title}))
    }, [dispatch])
    const changeTodolistTitle = useCallback((todolistId: string, title: string) => {
        dispatch(updateTodoTitleTC(todolistId, title))
    }, [dispatch])

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
            {status === "loading"&& <LinearProgress color={'secondary'} />}
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
                                          entityStatus={tl.entityStatus}
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
            <ErrorSnackbar/>
        </div>
    );
}
