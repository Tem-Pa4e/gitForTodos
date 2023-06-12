import {TaskPriorities, TaskStatuses} from "common/enums/common.enums"

export type FilterType = 'all' | 'active' | 'completed'
export type TasksStateType = {
    [key: string]: Array<TaskType>
}

export type TaskType = {
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

export type GetTodoType = {
    addedDate: string
    id: string
    order: number
    title: string
}
type UpdateTaskModelType = {
    title?: string
    description?: string
    status?: number
    priority?: number
    startDate?: string
    deadline?: string
}
export interface IRemoveTaskArgs {
    id: string,
    taskId: string
}
export interface IUpdateTaskArgs {
    id: string,
    taskId: string,
    model: UpdateTaskModelType
}
export interface IUpdateTodolistTitleArgs {
    id: string,
    title: string
}

