import React from 'react';
import './App.css';
import {ErrorSnackbar} from "../component/errorSnackbar/ErrorSnackbar";
import Container from "@mui/material/Container";
import {Login} from "../features/login/Login";
import {Route, Routes} from "react-router-dom";
import {StatusForm} from "../component/statusForm/StatusForm";
import {HeaderForm} from "../features/headerForm/HeaderForm";
import {Todolist} from "../features/todolist/Todolist";



export const App = () => {

    return (
        <div className="App">
            <HeaderForm/>
            <StatusForm/>
            <Container fixed>
                <Routes>
                    <Route path='/' element={<Todolist/>}/>
                    <Route path='/login' element={<Login/>}/>
                </Routes>
            </Container>
            <ErrorSnackbar/>
        </div>
    );
}
