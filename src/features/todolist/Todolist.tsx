import React, {useCallback, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import {TodolistForm} from "./todolistForm/TodolistForm";
import {AppRootStateType} from "../../state/store";
import {
    ChangeTodoFilterAC,
    createTodoTC,
    fetchTodosTC,
    removeTodoTC,
    TodolistStateType,
    updateTodoTitleTC
} from '../../state/todolists-reducer';
import {FilterType, TaskStatuses} from '../../typing/typing';
import {addTaskTC, removeTaskTC, updateTaskModelTC} from '../../state/tasks-reducer';
import {AddItemForm} from '../../component/addItem/AddItemForm';
import {Navigate} from "react-router-dom";
import './Todolist.css'

export const Todolist = () => {
    const todolists = useSelector<AppRootStateType, Array<TodolistStateType>>(state => state.todolists)
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.login.isLoggedIn)
    const dispatch = useDispatch()

    useEffect(() => {
        if (!isLoggedIn) {
            return
        }
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
    if (!isLoggedIn) {
        return <Navigate to={'/login'}/>
    }
    return (
        <>
            <Grid container style={{padding: '20px'}}>
                <div className={'todoItem'}>
                    <AddItemForm style={{border: '3px solid black', borderRadius: '7px', backgroundColor: 'rgba(0,0,0,0.7)'}} addItem={addTodolist}/>
                </div>
            </Grid>
            <Grid container spacing={3}>
                {todolists.map(tl => {
                    return <Grid item>
                        <Paper style={{backgroundColor: 'rgba(0,0,0,0.6)'}}>
                            <TodolistForm key={tl.id}
                                          todolist={tl}
                                          deleteTask={deleteTask}
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
        </>
    );
};

