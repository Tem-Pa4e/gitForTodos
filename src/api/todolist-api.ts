import axios from "axios";


const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': 'df9468ca-605b-46fc-bc8e-4044e920f223'
    }
})

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
        return instance.post<ResponseTaskType<{item: TaskDomainType}>>(`todo-lists/${todolistId}/tasks`, {title})
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<ResponseTaskType>(`todo-lists/${todolistId}/tasks/${taskId}`)
    },
    updateTask(todolistId: string,taskId: string, model: CreatedTaskEntityType) {
        return instance.put<ResponseTaskType<{item: CreatedTaskEntityType}>>(`todo-lists/${todolistId}/tasks/${taskId}`, model)
    }
};


export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}
export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4
}
export type TaskDomainType = {
    description: string
    title: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}
export type CreatedTaskEntityType = {
    title: string
    description: string
    status: number
    priority: number
    startDate: string
    deadline: string
}

type GetTaskType = {
    error: string
    items: TaskDomainType[]
    totalCount: number
}
export type GetTodoType = {
    addedDate: string
    id: string
    order: number
    title: string
}

type ResponseTaskType<T = {}> = {
    data: T
    fieldsErrors: string[]
    messages: string[]
    resultCode: number
}
type ResponseTodolistType<T ={}> = {
    data: T
    fieldsErrors: string[]
    messages: string[]
    resultCode: number
}

