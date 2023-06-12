import {CreatedTaskEntityType, GetTodoType, TaskType} from "typing/typing";
import {instance} from "common/api/common.api";
import {ResponseType} from "common/types/common.types";

type GetTaskType = {
    error: string
    items: TaskType[]
    totalCount: number
}

export const todolistApi = {
    getTodolists() {
        return instance.get<GetTodoType[]>('todo-lists')
    },
    addTodolist(title: string) {
        return instance.post<ResponseType<{ item: GetTodoType }>>('todo-lists', {title})
    },
    removeTodolist(todolistId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}`)
    },
    updateTodolist(todolistId: string, title: string) {
        return instance.put<ResponseType>(`todo-lists/${todolistId}`, {title})
    },
    getTasks(todolistId: string) {
        return instance.get<GetTaskType>(`todo-lists/${todolistId}/tasks`)
    },
    addTask(todolistId: string, title: string) {
        return instance.post<ResponseType<{ item: TaskType }>>(`todo-lists/${todolistId}/tasks`, {title})
    },
    removeTask(todolistId: string, taskId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`)
    },
    updateTask(todolistId: string, taskId: string, model: CreatedTaskEntityType) {
        return instance.put<ResponseType<{ item: CreatedTaskEntityType }>>(`todo-lists/${todolistId}/tasks/${taskId}`, model)
    }
};