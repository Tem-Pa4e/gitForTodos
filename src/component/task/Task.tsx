import React, {ChangeEvent} from 'react';
import {Button} from "../button/Button";
import {EditableSpan} from "../EditableSpan/EditableSpan";

type TaskPropsType = {
    title: string
    isDone: boolean
    deleteTask: () => void
    onChangeTaskStatus: (value: boolean) => void
    onChangeTaskTitle: (title: string) => void
}

export const Task = (props: TaskPropsType) => {
    const onChangeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
        props.onChangeTaskStatus(e.currentTarget.checked)
    }
    const onChangeTitle = (title: string) => {
        props.onChangeTaskTitle(title)
    }
    return (
        <ul>
            <li className={props.isDone ? 'is-done' : ''}><input type="checkbox" checked={props.isDone}
                                                                 onChange={onChangeTaskStatus}/><EditableSpan
                onChangeTitle={onChangeTitle} title={props.title}/><Button title={'x'} callBack={props.deleteTask}/></li>
        </ul>
    );
};