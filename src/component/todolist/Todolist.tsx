import React, {useCallback} from 'react';
import {FilterType, TaskType} from "../../App"
import {ButtonFilter} from "../buttonFilter/ButtonFilter";
import {Task} from '../task/Task';
import {AddItemForm} from "../addItem/AddItemForm";
import {ButtonFilterForm} from "../buttonFilterForm/ButtonFilterForm";
import {EditableSpan} from "../EditableSpan/EditableSpan";

type TodolistPropsType = {
    title: string
    id: string
    tasks: Array<TaskType>
    filter: FilterType
    deleteTask: (todolistId: string, taskId: string) => void
    changeFilter: (todolistId: string, value: FilterType) => void
    addTask: (todolistId: string, title: string) => void
    changeStatus: (todolistId: string, taskId: string, value: boolean) => void
    deleteTodolist: (todolistId: string) => void
    onChangeTaskTitle: (todolistId: string, taskId: string, title: string) => void
    changeTodolistTitle: (todolistId: string, title: string) => void
}

export const Todolist = React.memo((props: TodolistPropsType) => {

    let taskForTodolist = props.tasks
    if (props.filter === "active") {
        taskForTodolist = props.tasks.filter(t => !t.isDone)
    }
    if (props.filter === "completed") {
        taskForTodolist = props.tasks.filter(t => t.isDone)
    }
    const addTask = useCallback((title: string) => {
        props.addTask(props.id, title)
    }, [props.addTask, props.id])
    const deleteTodolist = useCallback(() => {
        props.deleteTodolist(props.id)
    }, [props.deleteTodolist, props.id])
    const onChangeTodolistTitle = useCallback((title: string) => {
        props.changeTodolistTitle(props.id, title)
    }, [props.changeTodolistTitle, props.id])
    const onChangeTaskStatus = useCallback((id: string, value: boolean) => {
        props.changeStatus(props.id, id, value)
    }, [props.id])
    const deleteTask = useCallback((id: string) => {
        props.deleteTask(props.id, id)
    }, [props.id])
    const onChangeTitle = useCallback((id: string, title: string) => {
        props.onChangeTaskTitle(props.id, id, title)
    }, [props.id])


    return (
        <div className={'todolistForm'}>
            <h3><EditableSpan onChangeTitle={onChangeTodolistTitle} title={props.title}/><ButtonFilter title={'delete'}
                                                                                                       callBack={deleteTodolist}/>
            </h3>
            <AddItemForm addItem={addTask}/>
            {taskForTodolist.map(t => {

                return <Task onChangeTaskTitle={onChangeTitle} task={t} key={t.id} deleteTask={deleteTask}
                             onChangeTaskStatus={onChangeTaskStatus}/>
            })}
            <ButtonFilterForm changeFilter={props.changeFilter} filter={props.filter} id={props.id}/>
        </div>
    );
});