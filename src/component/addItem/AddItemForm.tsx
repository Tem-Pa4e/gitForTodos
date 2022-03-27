import React, {ChangeEvent, useState, KeyboardEvent} from 'react';
import {Button} from "../button/Button";

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export const AddItemForm = (props: AddItemFormPropsType) => {
    const [title, setTitle] = useState<string>('')
    const [error, setError] = useState<null| string>(null)
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
        setError(null)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.key === 'Enter') {
            addItem()
        }
    }
    return (
        <div className={'itemForm'}>
            <input className={error ? 'error': ''} value={title} onChange={onChangeTitle} onKeyPress={onKeyPressHandler} /><Button title={'+'} callBack={addItem}/>
            {error && <div className={'error-message'}>{error}</div>}
        </div>

    );
};

