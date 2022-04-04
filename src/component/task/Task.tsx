import React, {ChangeEvent, useCallback} from 'react';
import {ButtonFilter} from "../buttonFilter/ButtonFilter";
import {EditableSpan} from "../EditableSpan/EditableSpan";
import {Checkbox} from "@material-ui/core";
import {TaskDomainType, TaskStatuses} from '../../typing/typing';

type TaskPropsType = {
    task: TaskDomainType
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
            <li className={props.task.status === TaskStatuses.Completed ? 'is-done' : ''}><Checkbox color={'primary'}
                                                                                                    size={'small'}
                                                                                                    checked={props.task.status === TaskStatuses.Completed}
                                                                                                    onChange={onChangeTaskStatus}/>
                <EditableSpan
                    onChangeTitle={onChangeTitle} title={props.task.title}/><ButtonFilter title={'delete'}
                                                                                          callBack={deleteTask}/></li>
        </ul>
    );
});