import React from 'react';
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import AppBar from "@mui/material/AppBar";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../state/store";
import {logoutTC} from "../../state/login-Reducer";

export const HeaderForm = () => {

    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.login.isLoggedIn)
    const dispatch = useDispatch()
    const logoutHandler = () => {
        dispatch(logoutTC())
    }

    return (
            <AppBar position="sticky">
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="menu">
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6">
                        Menu
                    </Typography>
                    {isLoggedIn && <Button onClick={logoutHandler} color="inherit">Logout</Button>}
                </Toolbar>
            </AppBar>
    );
};

