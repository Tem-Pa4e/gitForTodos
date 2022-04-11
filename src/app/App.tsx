import React, {useEffect} from 'react';
import './App.css';
import {ErrorSnackbar} from "../component/errorSnackbar/ErrorSnackbar";
import Container from "@mui/material/Container";
import {Login} from "../features/login/Login";
import {Navigate, Route, Routes} from "react-router-dom";
import {StatusForm} from "../component/statusForm/StatusForm";
import {HeaderForm} from "../features/headerForm/HeaderForm";
import {Todolist} from "../features/todolist/Todolist";
import {useDispatch, useSelector} from "react-redux";
import {initializeAppTC, RequestStatusType} from "../state/app-reducer";
import {AppRootStateType} from "../state/store";


export const App = () => {
    const status = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)
    const isInitialized = useSelector<AppRootStateType, boolean>(state => state.app.isInitialized)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(initializeAppTC())
    })
    if (!isInitialized) {
        return <StatusForm/>
    }
    return (
        <div className="App">
            <HeaderForm/>
            {status === 'loading' && <StatusForm/>}
            <Container fixed>
                <Routes>
                    <Route path='/' element={<Todolist/>}/>
                    <Route path='/login' element={<Login/>}/>
                    <Route path='/404' element={<h1 style={{textAlign: 'center'}}>404 PAGE NOT FOUND</h1>}/>
                    <Route path='*' element={<Navigate to={'/404'}/>}/>
                </Routes>
            </Container>
            <ErrorSnackbar/>
        </div>
    );
}
