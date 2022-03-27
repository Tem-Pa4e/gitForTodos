import React from 'react';
import {FilterType, TaskType } from "../../App"
import {Button} from "../button/Button";
import { Task } from '../task/Task';
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
    addTask: (todolistId: string,title: string) => void
    changeStatus: (todolistId: string,taskId: string, value: boolean) => void
    deleteTodolists: (todolistId: string) => void
    onChangeTaskTitle: (todolistId: string, taskId: string, title: string) => void
    changeTodolistTitle: (todolistId: string, title: string) => void
}

export const Todolist = (props: TodolistPropsType) => {

    const addTask = (title: string) => {
        props.addTask(props.id, title)
    }
    const deleteTodolist = () => {
        props.deleteTodolists(props.id)
    }
    const onChangeTodolistTitle = (title: string) => {
        props.changeTodolistTitle(props.id, title)
    }
    return (
        <div className={'todolistForm'}>
            <h3><EditableSpan onChangeTitle={onChangeTodolistTitle} title={props.title} /><Button title={'x'} callBack={deleteTodolist}/></h3>
            <AddItemForm addItem={addTask}/>
            {props.tasks.map(t => {
                const onChangeTaskStatus = (value: boolean) => {
                    props.changeStatus(props.id, t.id, value)
                }
                const deleteTask = () => {
                    props.deleteTask(props.id, t.id)
                }
                const onChangeTitle = (title: string) => {
                    props.onChangeTaskTitle(props.id, t.id, title)
                }
                return <Task onChangeTaskTitle={onChangeTitle} key={t.id} title={t.title} isDone={t.isDone} deleteTask={deleteTask} onChangeTaskStatus={onChangeTaskStatus}/>
            })}
            <ButtonFilterForm changeFilter={props.changeFilter} filter={props.filter} id={props.id}/>
        </div>
    );
};