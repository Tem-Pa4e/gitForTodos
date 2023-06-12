import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

import React from 'react';
import {RequestStatusType} from "app/app-reducer";

type ButtonPropsType = {
    title: string
    callBack: () => void
    disabled?: RequestStatusType
    variant?: 'text' | 'outlined' | 'contained'
    color?: "primary" | "inherit" | "secondary" | "success" | "error" | "info" | "warning"

}

export const ButtonComponent = React.memo((props: ButtonPropsType) => {
    let icons
    if (props.title === 'delete') {
        icons = <IconButton  size={"small"} disabled={props.disabled==='loading'} onClick={props.callBack}><DeleteIcon style={{color: 'white'}} /></IconButton>
    }
    if (props.title === 'added') {
        icons = <IconButton size={"small"}  disabled={props.disabled==='loading'} onClick={props.callBack}><AddIcon style={{color: 'white'}} fontSize={'large'}/></IconButton>
    }
    return props.title === 'delete' || props.title === 'added' ?
        <span>{icons}</span> :
        <Button size={'small'} style={{color: 'white',margin: '3px',padding: '3px'}} color={props.color} variant={props.variant}
                onClick={props.callBack}>{props.title}</Button>
});
