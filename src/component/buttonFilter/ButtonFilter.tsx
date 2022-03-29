import React from 'react';
import {Button, IconButton} from "@material-ui/core";
import {Add, Delete} from "@material-ui/icons";

type ButtonPropsType = {
    title: string
    callBack: () => void

    variant?: 'text' | 'outlined' | 'contained'
    color?: 'primary' | 'default' | 'inherit' | 'secondary'
}

export const ButtonFilter = (props: ButtonPropsType) => {
    let icons
    if (props.title === 'delete') {
        icons = <IconButton size={"small"} onClick={props.callBack}><Delete/></IconButton>
    }
    if (props.title === 'added') {
        icons = <IconButton size={"small"} onClick={props.callBack}><Add/></IconButton>
    }
    return props.title === 'delete' || props.title === 'added' ?
        <span>{icons}</span> :
        <Button size={'small'} color={props.color} variant={props.variant}
                onClick={props.callBack}>{props.title}</Button>
};
