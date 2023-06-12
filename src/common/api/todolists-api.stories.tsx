import { todolistApi } from 'features/todolist/todolist.api';
import React, {useEffect, useState} from 'react'
import {CreatedTaskEntityType} from "typing/typing";

export default {
    title: 'API'
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistApi.getTodolists()
            .then(res=> {
                setState(res.data)
            })
    }, [])
    return <div> {JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const title = "HTML"
        todolistApi.addTodolist(title)
            .then(res=> {
                setState(res.data.data.item)
            })
    }, [])
    return <div> {JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = "78367e7f-8d11-4fec-b28a-ea7ad933518c"
        todolistApi.removeTodolist(todolistId)
            .then(res=> {
                setState(res.data)
            })
    }, [])
    return <div> {JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = "f8367fdc-96b0-4feb-a7a1-cbb2f229c705"
        const title = 'CSS'
        todolistApi.updateTodolist(todolistId,title)
            .then(res=> {
                setState(res.data)
            })
    }, [])
    return <div> {JSON.stringify(state)}</div>
}
export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = "1e15cb8b-8e18-434f-9226-1ca74695dac4"
        todolistApi.getTasks(todolistId)
            .then(res=> {
                setState(res.data.items)
            })
    }, [])
    return <div> {JSON.stringify(state)}</div>
}
export const CreateTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = "1e15cb8b-8e18-434f-9226-1ca74695dac4"
        const title = "Params"
        todolistApi.addTask(todolistId, title)
            .then(res=> {
                setState(res.data.data.item)
            })
    }, [])
    return <div> {JSON.stringify(state)}</div>
}

export const DeleteTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = "1e15cb8b-8e18-434f-9226-1ca74695dac4"
        const taskId = "59dc011d-1abd-48d7-b2a3-247720280fd4"
        todolistApi.removeTask(todolistId, taskId)
            .then(res=> {
                setState(res.data)
            })
    }, [])
    return <div> {JSON.stringify(state)}</div>
}
export const UpdateTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = "1e15cb8b-8e18-434f-9226-1ca74695dac4"
        const taskId = "7e925960-8427-4be6-82af-818cec419d27"
        const newTask: CreatedTaskEntityType = {
            title: 'newTask',
            description: '',
            status: 0,
            priority: 1,
            startDate: new Date().toDateString(),
            deadline: ''
        }
        if (!newTask) {
            return
        }
        todolistApi.updateTask(todolistId, taskId, newTask)
            .then(res=> {
                setState(res.data)
            })
    }, [])
    return <div> {JSON.stringify(state)}</div>
}
