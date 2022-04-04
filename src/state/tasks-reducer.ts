import {AddTodoAT, RemoveTodoAT, SetTodoAT} from "./todolists-reducer";
import {Dispatch} from "redux";
import {todolistApi} from "../api/todolist-api";
import {AppRootStateType} from "./store";
import {CreatedTaskEntityType, TaskDomainType, TasksStateType} from "../typing/typing";
import {SetAppStatusAC, SetAppStatusAT} from "../component/app/app-reducer";

const initialState: TasksStateType = {}

type ActionTaskType =
    RemoveTodoAT
    | AddTodoAT
    | SetTodoAT
    | SetAppStatusAT
    | ReturnType<typeof SetTasksAC>
    | ReturnType<typeof UpdateTaskAC>
    | ReturnType<typeof RemoveTaskAC>
    | ReturnType<typeof AddTaskAC>

export const tasksReducer = (state = initialState, action: ActionTaskType): TasksStateType => {
    switch (action.type) {
        case "UPDATE-TASK": {
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(t => t.id === action.taskId ? {...t, ...action.model} : t)
            }
        }
        case "SET-TASKS": {
            const copyState = {...state}
            copyState[action.todolistId] = action.tasks
            return copyState
        }
        case "SET-TODOLIST": {
            const stateCopy = {...state}
            action.todolists.forEach((tl) => {
                stateCopy[tl.id] = []
            })
            return stateCopy
        }
        case "REMOVE-TASK": {
            return {...state, [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.taskId)}
        }
        case "ADD-TASK": {

            return {
                ...state,
                [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]
            }
        }
        case "ADD-TODOLIST": {
            return {...state, [action.todolist.id]: []}
        }
        case "REMOVE-TODOLIST": {
            let copyState = {...state}
            delete copyState[action.todolistId]
            return copyState
        }
        default:
            return state
    }
}

export const RemoveTaskAC = (todolistId: string, taskId: string) => ({type: 'REMOVE-TASK', todolistId, taskId} as const)
export const AddTaskAC = (task: TaskDomainType) => ({type: 'ADD-TASK', task} as const)
export const SetTasksAC = (todolistId: string, tasks: Array<TaskDomainType>) => ({
    type: 'SET-TASKS',
    todolistId,
    tasks
} as const)
export const UpdateTaskAC = (todolistId: string, taskId: string, model: UpdateTaskModelType) => ({
    type: 'UPDATE-TASK',
    todolistId, taskId, model
} as const)

export const fetchTaskTC = (todolistId: string) => {

    return (dispatch: Dispatch<ActionTaskType>) => {
        dispatch(SetAppStatusAC('loading'))
        todolistApi.getTasks(todolistId)
            .then(res => {
                dispatch(SetTasksAC(todolistId, res.data.items))
                dispatch(SetAppStatusAC('succeeded'))
            })
    }
}
export const removeTaskTC = (todolistId: string, taskId: string) => {
    return (dispatch: Dispatch<ActionTaskType>) => {
        dispatch(SetAppStatusAC('loading'))
        todolistApi.deleteTask(todolistId, taskId)
            .then(res => {
                dispatch(RemoveTaskAC(todolistId, taskId))
                dispatch(SetAppStatusAC('succeeded'))
            })
    }
}
export const addTaskTC = (todolistId: string, title: string) => {
    return (dispatch: Dispatch<ActionTaskType>) => {
        dispatch(SetAppStatusAC('loading'))
        todolistApi.createTask(todolistId, title)
            .then(res => {
                dispatch(AddTaskAC(res.data.data.item))
                dispatch(SetAppStatusAC('succeeded'))
            })
    }
}

type UpdateTaskModelType = {
    title?: string
    description?: string
    status?: number
    priority?: number
    startDate?: string
    deadline?: string
}
export const updateTaskModelTC = (todolistId: string, taskId: string, model: UpdateTaskModelType) => {
    return (dispatch: Dispatch, getState: () => AppRootStateType) => {
        dispatch(SetAppStatusAC('loading'))
        const actualState = getState().tasks
        const arrayTasks = actualState[todolistId]
        const task = arrayTasks.find(t => t.id === taskId)
        if (task) {
            const apiModel: CreatedTaskEntityType = {
                title: task.title,
                startDate: task.startDate,
                priority: task.priority,
                description: task.description,
                deadline: task.deadline,
                status: task.status,
                ...model
            }
            todolistApi.updateTask(todolistId, taskId, apiModel)
                .then(() => {
                    dispatch(UpdateTaskAC(todolistId, taskId, model))
                    dispatch(SetAppStatusAC('succeeded'))
                })
        }
    }
}


