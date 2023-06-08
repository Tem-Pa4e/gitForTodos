import React, {useCallback, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import {TodolistForm} from "./todolistForm/TodolistForm";
import {AppRootStateType} from "state/store";
import {
    createTodoTC,
    fetchTodosTC,
    removeTodoTC, todolistsActions,
    TodolistStateType,
    updateTodoTitleTC
} from 'features/todolist/todolists-reducer';
import {FilterType, TaskStatuses} from 'typing/typing';
import {tasksThunks} from 'features/todolist/tasks.reducer';
import {AddItemForm} from 'component/addItem/AddItemForm';
import {Navigate} from "react-router-dom";
import './Todolist.css'
import {selectIsLoggedIn} from "features/auth/auth.selector";

export const Todolist = () => {
    const todolists = useSelector<AppRootStateType, Array<TodolistStateType>>(state => state.todolists)
    const isLoggedIn = useSelector(selectIsLoggedIn)
    const dispatch = useDispatch()

    useEffect(() => {
        if (!isLoggedIn) {
            return
        }
        dispatch(fetchTodosTC())
    }, [isLoggedIn, dispatch])
    const deleteTodolist = useCallback((todolistId: string) => {
        dispatch(removeTodoTC(todolistId))
    }, [dispatch])
    const changeStatus = useCallback((id: string, taskId: string, status: TaskStatuses) => {
        dispatch(tasksThunks.updateTask({id, taskId, model: {status}}))
    }, [dispatch])
    const deleteTask = useCallback((id: string, taskId: string) => {
        dispatch(tasksThunks.removeTask({id, taskId}))
    }, [dispatch])
    const addTask = useCallback((id: string, title: string) => {
        dispatch(tasksThunks.addTask({id, title}))
    }, [dispatch])
    const changeFilter = useCallback((id: string, filter: FilterType) => {
        dispatch(todolistsActions.changeTodolistFilter({id, filter}))
    }, [dispatch])
    const addTodolist = useCallback((title: string) => {
        dispatch(createTodoTC(title))
    }, [dispatch])
    const changeTasktitle = useCallback((id: string, taskId: string, title: string) => {
        dispatch(tasksThunks.updateTask({id, taskId, model: {title}}))
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
                        <Paper style={{backgroundColor: 'rgba(0,0,0,0.7)', marginRight: '35px'}}>
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

