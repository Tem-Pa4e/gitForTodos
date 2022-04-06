import React, {ChangeEvent, useState, KeyboardEvent} from 'react';
import {ButtonFilter} from "../buttonFilter/ButtonFilter";
import {TextField} from "@material-ui/core";
import {RequestStatusType} from "../app/app-reducer";

type AddItemFormPropsType = {
    addItem: (title: string) => void
    disabled?: RequestStatusType
}

export const AddItemForm = React.memo((props: AddItemFormPropsType) => {
    const [title, setTitle] = useState<string>('')
    const [error, setError] = useState<null | string>(null)

    const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const addItem = () => {
        if (title.trim() !== '') {
            props.addItem(title)
            setTitle('')
            setError(null)
        } else {
            setError('Title is required')
        }
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (error !== null) {
            setError(null)
        }
        if (e.key === 'Enter') {
            addItem()
        }
    }
    return (
        <div className={'itemForm'}>
            <TextField helperText={error} disabled={props.disabled==='loading'} size={"small"} error={!!error} value={title} onChange={onChangeTitle}
                       onKeyPress={onKeyPressHandler}/><ButtonFilter disabled={props.disabled} title={'added'} callBack={addItem}/>
        </div>
    );
});

