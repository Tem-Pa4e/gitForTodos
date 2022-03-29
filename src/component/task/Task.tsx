import React, {ChangeEvent} from 'react';
import {ButtonFilter} from "../buttonFilter/ButtonFilter";
import {EditableSpan} from "../EditableSpan/EditableSpan";
import {Checkbox, Radio, Switch} from "@material-ui/core";


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
            <li className={props.isDone ? 'is-done' : ''}><Checkbox color={'primary'} size={'small'}
                                                                    checked={props.isDone}
                                                                    onChange={onChangeTaskStatus}/>
                <EditableSpan
                    onChangeTitle={onChangeTitle} title={props.title}/><ButtonFilter title={'delete'}
                                                                                     callBack={props.deleteTask}/></li>
        </ul>
    );
};