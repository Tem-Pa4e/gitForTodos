import axios from "axios";
import {CreatedTaskEntityType, GetTodoType, TaskDomainType} from "../typing/typing";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': 'df9468ca-605b-46fc-bc8e-4044e920f223'
    }
})

type ResponseTaskType<T = {}> = {
    data: T
    fieldsErrors: string[]
    messages: string[]
    resultCode: number
}
type ResponseTodolistType<T = {}> = {
    data: T
    fieldsErrors: string[]
    messages: string[]
    resultCode: number
}
type GetTaskType = {
    error: string
    items: TaskDomainType[]
    totalCount: number
}

export const todolistApi = {
    getTodos() {
        return instance.get<GetTodoType[]>('todo-lists')
    },
    createTodo(title: string) {
        return instance.post<ResponseTodolistType<{ item: GetTodoType }>>('todo-lists', {title})
    },
    deleteTodo(todolistId: string) {
        return instance.delete<ResponseTodolistType>(`todo-lists/${todolistId}`)
    },
    updateTodo(todolistId: string, title: string) {
        return instance.put<ResponseTodolistType>(`todo-lists/${todolistId}`, {title})
    },
    getTasks(todolistId: string) {
        return instance.get<GetTaskType>(`todo-lists/${todolistId}/tasks`)
    },
    createTask(todolistId: string, title: string) {
        return instance.post<ResponseTaskType<{ item: TaskDomainType }>>(`todo-lists/${todolistId}/tasks`, {title})
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<ResponseTaskType>(`todo-lists/${todolistId}/tasks/${taskId}`)
    },
    updateTask(todolistId: string, taskId: string, model: CreatedTaskEntityType) {
        return instance.put<ResponseTaskType<{ item: CreatedTaskEntityType }>>(`todo-lists/${todolistId}/tasks/${taskId}`, model)
    }
};


