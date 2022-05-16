import React, {ChangeEvent, useState} from 'react';
import {TextField} from "@mui/material";



type EditableSpanPropsType = {
    title: string
    onChangeTitle: (title: string) => void
}

export const EditableSpan = React.memo((props: EditableSpanPropsType) => {
    const [editMode, setEditMpde] = useState(false)
    const [title, setTitle] = useState(props.title)
    const [error, setError] = useState("")
    const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const activateEditMode = () => {
        setEditMpde(true)
        setTitle(props.title)
    }
    const offEditMode = () => {
        if (title.trim() !== '') {
            setEditMpde(false)
            props.onChangeTitle(title)
            setError("")
        } else {
            setError("Title is required!")
        }
    }

    return editMode ?
        <TextField size={'small'} error={!!error} helperText={error} value={title} onChange={onChangeTitle} autoFocus
                   onBlur={offEditMode} color={'success'}
                   variant={'standard'}/> :
        <span style={{color: 'aliceblue'}} onDoubleClick={activateEditMode}>{props.title}</span>
});

