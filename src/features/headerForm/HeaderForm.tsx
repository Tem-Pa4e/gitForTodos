import React from 'react';
import Button from "@mui/material/Button";
import {useDispatch, useSelector} from "react-redux";
import {logoutTC} from "features/auth/auth.reducer";
import './HeaderForm.css'
import {selectIsLoggedIn} from "features/auth/auth.selector";

export const HeaderForm = () => {

    const isLoggedIn = useSelector(selectIsLoggedIn)
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

