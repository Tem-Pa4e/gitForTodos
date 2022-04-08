import React from 'react';
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../state/store";
import {RequestStatusType} from "../../state/app-reducer";
import LinearProgress from "@mui/material/LinearProgress";

export const StatusForm = () => {
    const status = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)
    return (
        <>
            {status === "loading" && <LinearProgress color={'secondary'}/>}
        </>
    )
};
