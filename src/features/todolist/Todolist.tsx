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
                <AddItemForm addItem={addTodolist}/>
            </Grid>
            <Grid container spacing={3}>
                {todolists.map(tl => {
                    return <Grid item>
                        <Paper style={{padding: '10px'}}>
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

