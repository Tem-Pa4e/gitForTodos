import React from 'react';
import Button from "@mui/material/Button";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "state/store";
import {logoutTC} from "state/auth-reducer";
import './HeaderForm.css'

export const HeaderForm = () => {

    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.login.isLoggedIn)
    const dispatch = useDispatch()
    const logoutHandler = () => {
        dispatch(logoutTC())
    }

    return (
        <div className={'headerBlock'}>
            {isLoggedIn && <Button onClick={logoutHandler} variant={'contained'} color="primary">Logout</Button>}
        </div>
    );
};

