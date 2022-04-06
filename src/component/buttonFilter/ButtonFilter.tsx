import React from 'react';
import {Button, IconButton} from "@material-ui/core";
import {Add, Delete} from "@material-ui/icons";
import {RequestStatusType} from "../app/app-reducer";

type ButtonPropsType = {
    title: string
    callBack: () => void
    disabled?: RequestStatusType
    variant?: 'text' | 'outlined' | 'contained'
    color?: "primary" | "inherit" | "secondary" | "success" | "error" | "info" | "warning"
}

export const ButtonFilter = React.memo((props: ButtonPropsType) => {
    let icons
    if (props.title === 'delete') {
        icons = <IconButton size={"small"} disabled={props.disabled==='loading'} onClick={props.callBack}><Delete/></IconButton>
    }
    if (props.title === 'added') {
        icons = <IconButton size={"small"} disabled={props.disabled==='loading'} onClick={props.callBack}><Add/></IconButton>
    }
    return props.title === 'delete' || props.title === 'added' ?
        <span>{icons}</span> :
        <Button size={'small'} color={props.color} variant={props.variant}
                onClick={props.callBack}>{props.title}</Button>
});
