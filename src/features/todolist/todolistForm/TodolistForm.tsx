import React, {useCallback, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import { ButtonComponent } from '../../../component/buttonComponent/ButtonComponent';
import { EditableSpan } from '../../../component/EditableSpan/EditableSpan';
import { AppRootStateType } from '../../../state/store';
import { fetchTaskTC } from '../../../state/tasks-reducer';
import { TodolistStateType } from '../../../state/todolists-reducer';
import {FilterType, TasksStateType, TaskStatuses} from "../../../typing/typing";
import { AddItemForm } from '../../../component/addItem/AddItemForm';
import {ButtonFilterForm} from "../../../component/buttonFilterForm/ButtonFilterForm";
import {Task} from "./task/Task";
import './TodolistForm.css'



type TodolistPropsType = {
    todolist: TodolistStateType
    deleteTask: (todolistId: string, taskId: string) => void
    changeFilter: (todolistId: string, value: FilterType) => void
    addTask: (todolistId: string, title: string) => void
    changeStatus: (todolistId: string, taskId: string, value: TaskStatuses) => void
    deleteTodolist: (todolistId: string) => void
    onChangeTaskTitle: (todolistId: string, taskId: string, title: string) => void
    changeTodolistTitle: (todolistId: string, title: string) => void
}

export const TodolistForm = React.memo((props: TodolistPropsType) => {
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchTaskTC(props.todolist.id))
    }, [])

    let taskForTodolist = tasks[props.todolist.id]
    if (props.todolist.filter === "active") {
        taskForTodolist = tasks[props.todolist.id].filter(t => !t.status)
    }
    if (props.todolist.filter === "completed") {
        taskForTodolist = tasks[props.todolist.id].filter(t => t.status)
    }

    const addTask = useCallback((title: string) => {
        props.addTask(props.todolist.id, title)
    }, [props.addTask, props.todolist.id])
    const deleteTodolist = useCallback(() => {
        props.deleteTodolist(props.todolist.id)
    }, [props.deleteTodolist, props.todolist.id])
    const onChangeTodolistTitle = useCallback((title: string) => {
        props.changeTodolistTitle(props.todolist.id, title)
    }, [props.changeTodolistTitle, props.todolist.id])
    const onChangeTaskStatus = useCallback((id: string, value: TaskStatuses) => {
        props.changeStatus(props.todolist.id, id, value)
    }, [props.todolist.id])
    const deleteTask = useCallback((id: string) => {
        props.deleteTask(props.todolist.id, id)
    }, [props.todolist.id])
    const onChangeTitle = useCallback((id: string, title: string) => {
        props.onChangeTaskTitle(props.todolist.id, id, title)
    }, [props.todolist.id])

    return (
        <div className={'todolistForm'}>
            <h3><EditableSpan onChangeTitle={onChangeTodolistTitle} title={props.todolist.title}/>
                <ButtonComponent disabled={props.todolist.entityStatus} title={'delete'}
                                 callBack={deleteTodolist}/>
            </h3>
            <AddItemForm style={{border: '3px solid black', borderRadius: '7px',backgroundColor: 'rgba(0,0,0,0.7)'}} disabled={props.todolist.entityStatus} addItem={addTask}/>
            {taskForTodolist.map(t => {
                return <Task onChangeTaskTitle={onChangeTitle} task={t} key={t.id} deleteTask={deleteTask}
                             onChangeTaskStatus={onChangeTaskStatus}/>
            })}
            <ButtonFilterForm changeFilter={props.changeFilter} filter={props.todolist.filter} id={props.todolist.id}/>
        </div>
    );
});