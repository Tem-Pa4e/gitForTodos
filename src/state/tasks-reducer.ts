
import {AddTodoAT, RemoveTodoAT, SetTodoAT} from "./todolists-reducer";
import {TasksStateType} from "../App";
import {Dispatch} from "redux";
import {TaskDomainType,TaskStatuses, todolistApi} from "../api/todolist-api";
import {AppRootStateType} from "./store";

const initialState: TasksStateType = {}


export const tasksReducer = (state = initialState, action: ActionTaskType): TasksStateType => {
    switch (action.type) {
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
                [action.task.todoListId]: [action.task,...state[action.task.todoListId]]}
        }
        case "CHANGE-TASK-STATUS": {
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(t => t.id === action.taskId ? {
                    ...t,
                    status: action.status
                } : t)
            }
        }
        case "CHANGE-TASK-TITLE": {
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(t => t.id === action.taskId ? {
                    ...t,
                    title: action.title
                } : t)
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
export const ChangeTaskStatusAC = (todolistId: string, taskId: string, status: TaskStatuses) => ({
    type: 'CHANGE-TASK-STATUS',
    todolistId,
    taskId,
    status
} as const)
export const ChangeTaskTitleAC = (todolistId: string, taskId: string, title: string) => ({
    type: 'CHANGE-TASK-TITLE',
    todolistId,
    taskId,
    title
} as const)
export const SetTasksAC = (todolistId: string, tasks: Array<TaskDomainType>) => ({
    type: 'SET-TASKS',
    todolistId,
    tasks
} as const)


type ActionTaskType =
    ReturnType<typeof RemoveTaskAC>
    | ReturnType<typeof AddTaskAC>
    | ReturnType<typeof ChangeTaskStatusAC>
    | ReturnType<typeof ChangeTaskTitleAC>
    | RemoveTodoAT
    | AddTodoAT
    | SetTodoAT
    | ReturnType<typeof SetTasksAC>

export const fetchTaskTC = (todolistId: string) => {
    return (dispatch: Dispatch) => {
        todolistApi.getTasks(todolistId)
            .then(res => {
                dispatch(SetTasksAC(todolistId, res.data.items))
            })

    }
}
export const removeTaskTC = (todolistId: string, taskId: string) => {
    return (dispatch: Dispatch) => {
        todolistApi.deleteTask(todolistId, taskId)
            .then(res=> {
                dispatch(RemoveTaskAC(todolistId, taskId))
            })
    }
}
export const addTaskTC = (todolistId: string, title: string) => {
    return (dispatch: Dispatch) => {
        todolistApi.createTask(todolistId, title)
            .then(res => {
                dispatch(AddTaskAC(res.data.data.item))
            })
    }
}
export const updateTaskStatus = (todolistId: string, taskId: string, status: TaskStatuses) => {
    return (dispatch: Dispatch, getState: () => AppRootStateType) => {
        let allTasks = getState().tasks
        let taskForTodolist = allTasks[todolistId]
        let task = taskForTodolist.find(t => {
            return t.id === taskId
        })
        if (task) {
            todolistApi.updateTask(todolistId, taskId, {
                status: status,
                title: task.title,
                startDate: task.startDate,
                priority: task.priority,
                description: task.description,
                deadline: task.deadline
            })
                .then(()=> {
                    dispatch(ChangeTaskStatusAC(todolistId, taskId, status))
                })
        }
    }
}
export const updateTaskTitle = (todolistId: string, taskId: string, title: string) => {
    return (dispatch: Dispatch, getState: () => AppRootStateType) => {
        let allTasks = getState().tasks
        let taskForTodolist = allTasks[todolistId]
        let task = taskForTodolist.find(t => {
            return t.id === taskId
        })
        if (task) {
            todolistApi.updateTask(todolistId, taskId, {
                status: task.status,
                title: title,
                startDate: task.startDate,
                priority: task.priority,
                description: task.description,
                deadline: task.deadline
            })
                .then(()=> {
                    dispatch(ChangeTaskTitleAC(todolistId, taskId, title))
                })
        }
    }
}