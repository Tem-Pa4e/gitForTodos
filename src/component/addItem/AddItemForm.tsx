import React, {ChangeEvent, useState, KeyboardEvent} from 'react';
import {ButtonFilter} from "../buttonFilter/ButtonFilter";
import {TextField} from "@material-ui/core";


type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export const AddItemForm = (props: AddItemFormPropsType) => {
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
        setError(null)
        if (e.key === 'Enter') {
            addItem()
        }
    }
    return (
        <div className={'itemForm'}>
            <TextField helperText={error} size={"small"} error={!!error} value={title} onChange={onChangeTitle}
                       onKeyPress={onKeyPressHandler}/><ButtonFilter title={'added'} callBack={addItem}/>

        </div>

    );
};

