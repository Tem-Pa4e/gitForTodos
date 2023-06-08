
export type FilterType = 'all' | 'active' | 'completed'
export type TasksStateType = {
    [key: string]: Array<TaskType>
}

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

