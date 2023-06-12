import React, {ChangeEvent, useCallback} from 'react';
import Checkbox from '@mui/material/Checkbox';
import {TaskType} from 'typing/typing';
import {EditableSpan} from 'common/components/EditableSpan/EditableSpan';
import {ButtonComponent} from 'common/components/buttonComponent/ButtonComponent';
import {TaskStatuses} from "common/enums/common.enums";

type TaskPropsType = {
    task: TaskType
    deleteTask: (id: string) => void
    onChangeTaskStatus: (id: string, value: TaskStatuses) => void
    onChangeTaskTitle: (id: string, title: string) => void
}

export const Task = React.memo((props: TaskPropsType) => {
    const onChangeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
        props.onChangeTaskStatus(props.task.id, e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New)
    }
    const onChangeTitle = useCallback((title: string) => {
        props.onChangeTaskTitle(props.task.id, title)
    }, [props.onChangeTaskTitle, props.task.id])
    const deleteTask = useCallback(() => {
        props.deleteTask(props.task.id)
    }, [props.deleteTask, props.task.id])
    return (
        <ul>
            <li className={props.task.status === TaskStatuses.Completed ? 'is-done' : ''}><Checkbox style={{color: 'white'}} color={'success'}
                                                                                                    size={'small'}
                                                                                                    checked={props.task.status === TaskStatuses.Completed}
                                                                                                    onChange={onChangeTaskStatus}/>
                <EditableSpan
                    onChangeTitle={onChangeTitle} title={props.task.title}/><ButtonComponent title={'delete'}
                                                                                             callBack={deleteTask}/></li>
        </ul>
    );
});