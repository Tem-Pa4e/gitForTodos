import {Dispatch} from "redux";
import {todolistApi} from "api/todolist-api";
import {AppRootStateType} from "./store";
import {CreatedTaskEntityType, TaskDomainType, TasksStateType} from "typing/typing";
import {handleServerAppError, handleServerNetworkError} from "utils/error-utils";
import {AxiosError} from "axios";
import {appActions} from "state/app-reducer";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {todolistsActions} from "state/todolists-reducer";

const initialState: TasksStateType = {}

const slice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        removeTask: ((state, action: PayloadAction<{ id: string, taskId: string }>) => {
            const task = state[action.payload.id].findIndex(task => task.id === action.payload.taskId)
            if (task !== -1) state[action.payload.id].splice(task, 1)
        }),
        addTask: ((state, action: PayloadAction<{ task: TaskDomainType }>) => {
            state[action.payload.task.todoListId].unshift(action.payload.task)
        }),
        setTasks: ((state, action: PayloadAction<{ id: string, tasks: Array<TaskDomainType> }>) => {
            state[action.payload.id] = action.payload.tasks
        }),
        updateTask: ((state, action: PayloadAction<{ id: string, taskId: string, model: UpdateTaskModelType }>) => {
            const tasks = state[action.payload.id]
            const index = tasks.findIndex(t => t.id === action.payload.taskId)
            if (index !== -1) tasks[index] = {...tasks[index], ...action.payload.model}
        }),
    },
    extraReducers: builder => {
        builder
            .addCase(todolistsActions.addTodolist, ((state, action) => {
                state[action.payload.todolist.id] = []
            }))
            .addCase(todolistsActions.removeTodolist, ((state, action) => {
                delete state[action.payload.id]
            }))
            .addCase(todolistsActions.setTodolist, ((state, action) => {
                action.payload.todolists.forEach((tl) => {
                    state[tl.id] = []
                })
            }))

    }
})

export const tasksReducer = slice.reducer
export const tasksActions = slice.actions


export const fetchTaskTC = (id: string) => {

    return (dispatch: Dispatch) => {
        dispatch(appActions.setAppStatus({status: 'loading'}))
        todolistApi.getTasks(id)
            .then(res => {
                dispatch(tasksActions.setTasks({id, tasks: res.data.items}))
                dispatch(appActions.setAppStatus({status: 'succeeded'}))
            })
    }
}
export const removeTaskTC = (id: string, taskId: string) => {
    return (dispatch: Dispatch) => {
        dispatch(appActions.setAppStatus({status: 'loading'}))
        todolistApi.deleteTask(id, taskId)
            .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(tasksActions.removeTask({id, taskId}))
                    dispatch(appActions.setAppStatus({status: 'succeeded'}))
                } else {
                    handleServerAppError(dispatch, res.data)
                }

            })
            .catch((err: AxiosError) => {
                handleServerNetworkError(dispatch, err.message)
            })
    }
}
export const addTaskTC = (todolistId: string, title: string) => {
    return (dispatch: Dispatch) => {
        dispatch(appActions.setAppStatus({status: 'loading'}))
        todolistApi.createTask(todolistId, title)
            .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(tasksActions.addTask({task: res.data.data.item}))
                    dispatch(appActions.setAppStatus({status: 'succeeded'}))
                } else {
                    handleServerAppError<{ item: TaskDomainType }>(dispatch, res.data)
                }
            })
            .catch((err: AxiosError) => {
                handleServerNetworkError(dispatch, err.message)
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
export const updateTaskModelTC = (id: string, taskId: string, model: UpdateTaskModelType) => {
    return (dispatch: Dispatch, getState: () => AppRootStateType) => {
        dispatch(appActions.setAppStatus({status: 'loading'}))
        const actualState = getState().tasks
        const arrayTasks = actualState[id]
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
            todolistApi.updateTask(id, taskId, apiModel)
                .then((res) => {
                    if (res.data.resultCode === 0) {
                        dispatch(tasksActions.updateTask({id, taskId, model}))
                        dispatch(appActions.setAppStatus({status: 'succeeded'}))
                    } else {
                        handleServerAppError<{ item: CreatedTaskEntityType }>(dispatch, res.data)
                    }

                })
                .catch((err: AxiosError) => {
                    handleServerNetworkError(dispatch, err.message)
                })
        }
    }
}


