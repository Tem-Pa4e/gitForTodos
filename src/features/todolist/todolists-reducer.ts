import {Dispatch} from "redux";
import {FilterType, GetTodoType} from "typing/typing";
import {todolistApi} from "api/todolist-api";
import {appActions, RequestStatusType} from "state/app-reducer";
import {handleServerAppError, handleServerNetworkError} from "utils/error-utils";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {clearTasksAndTodolists} from "common/actions/common.actions";
import {tasksThunks} from "features/todolist/tasks.reducer";

const initialState: Array<TodolistStateType> = []

export type TodolistStateType = GetTodoType & {
    filter: FilterType
    entityStatus?: RequestStatusType
}

const slice = createSlice({
    name: 'todolists',
    initialState,
    reducers: {
        removeTodolist: ((state, action: PayloadAction<{ id: string }>) => {
            const todolist = state.findIndex(todo => todo.id === action.payload.id)
            if (todolist !== -1) state.splice(todolist, 1)
        }),
        addTodolist: ((state, action: PayloadAction<{ todolist: GetTodoType }>) => {
            state.unshift({...action.payload.todolist, filter: 'all', entityStatus: 'idle'})
        }),
        changeTodolistTitle: ((state, action: PayloadAction<{ id: string, title: string }>) => {
            const todolist = state.findIndex(todo => todo.id === action.payload.id)
            if (todolist !== -1) state[todolist].title = action.payload.title
        }),
        changeTodolistFilter: ((state, action: PayloadAction<{ id: string, filter: FilterType }>) => {
            const todolist = state.findIndex(todo => todo.id === action.payload.id)
            if (todolist !== -1) state[todolist].filter = action.payload.filter
        }),
        changeTodolistEntityStatus: ((state, action: PayloadAction<{ id: string, entityStatus: RequestStatusType }>) => {
            const todolist = state.findIndex(todo => todo.id === action.payload.id)
            if (todolist !== -1) state[todolist].entityStatus = action.payload.entityStatus
        }),
        setTodolist: ((state, action: PayloadAction<{ todolists: Array<GetTodoType> }>) => {
            return action.payload.todolists.map((tl) => {
                return {...tl, filter: 'all', entityStatus: 'idle'}
            })
        }),
    },
    extraReducers: builder => {
        builder
            .addCase(clearTasksAndTodolists.type, () => {
                return []
            })
    }
})

export const todolistsReducer = slice.reducer
export const todolistsActions = slice.actions

export const fetchTodosTC = () => {
    return (dispatch: any) => {
        dispatch(appActions.setAppStatus({status: 'loading'}))
        todolistApi.getTodos()
            .then(res => {
                dispatch(todolistsActions.setTodolist({todolists: res.data}))
                dispatch(appActions.setAppStatus({status: 'succeeded'}))
                return res.data
            })
            .then((todolists) => {
                todolists.forEach((tl) => {
                    dispatch(tasksThunks.fetchTasks(tl.id))
                })
            })
            .catch((err) => {
                handleServerNetworkError(dispatch, err)
            })


    }
}
export const removeTodoTC = (id: string) => {
    return (dispatch: Dispatch) => {
        dispatch(appActions.setAppStatus({status: 'loading'}))
        dispatch(todolistsActions.changeTodolistEntityStatus({id, entityStatus:'loading'}))
        todolistApi.deleteTodo(id)
            .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(todolistsActions.removeTodolist({id}))
                    dispatch(appActions.setAppStatus({status: 'succeeded'}))
                } else {
                    handleServerAppError(dispatch, res.data)
                }
            })
    }
}
export const createTodoTC = (title: string) => {
    return (dispatch: Dispatch) => {
        dispatch(appActions.setAppStatus({status: 'loading'}))
        todolistApi.createTodo(title)
            .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(todolistsActions.addTodolist({todolist: res.data.data.item}))

                    dispatch(appActions.setAppStatus({status: 'succeeded'}))
                } else {
                    handleServerAppError<{ item: GetTodoType }>(dispatch, res.data)
                }
            })
            .catch((err) => {
                handleServerNetworkError(dispatch, err)
            })
    }
}
export const updateTodoTitleTC = (id: string, title: string) => {
    return (dispatch: Dispatch) => {
        dispatch(appActions.setAppStatus({status: 'loading'}))
        todolistApi.updateTodo(id, title)
            .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(todolistsActions.changeTodolistTitle({id, title}))
                    dispatch(appActions.setAppStatus({status: 'succeeded'}))
                } else {
                    handleServerAppError(dispatch, res.data)
                }
            })
            .catch((err) => {
                handleServerNetworkError(dispatch, err)
            })
    }
}

