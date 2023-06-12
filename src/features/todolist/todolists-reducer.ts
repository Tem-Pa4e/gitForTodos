import {FilterType, GetTodoType, IUpdateTodolistTitleArgs} from "typing/typing";
import {appActions, RequestStatusType} from "app/app-reducer";
import {createAppAsyncThunk, handleServerAppError, handleServerNetworkError} from "common/utils";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {clearTasksAndTodolists} from "common/actions/common.actions";
import {ResultCode} from "common/enums/common.enums";
import {todolistApi} from "features/todolist/todolist.api";

const initialState: Array<TodolistStateType> = []

export type TodolistStateType = GetTodoType & {
    filter: FilterType
    entityStatus?: RequestStatusType
}

const fetchTodolists = createAppAsyncThunk<{ todolists: GetTodoType[] }, void>('todolists/fetchTodolists', async (arg, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI
    try {
        dispatch(appActions.setAppStatus({status: 'loading'}))
        const res = await todolistApi.getTodolists()
        dispatch(appActions.setAppStatus({status: 'succeeded'}))
        return {todolists: res.data}
    } catch (e) {
        handleServerNetworkError(e, dispatch)
        return rejectWithValue(null)
    }
})
const removeTodolist = createAppAsyncThunk<{ id: string }, string>('todolists/removeTodolist', async (arg, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI
    try {
        dispatch(appActions.setAppStatus({status: 'loading'}))
        dispatch(todolistsActions.changeTodolistEntityStatus({id: arg, entityStatus: 'loading'}))
        const res = await todolistApi.removeTodolist(arg)
        if (res.data.resultCode === ResultCode.Success) {
            dispatch(appActions.setAppStatus({status: 'succeeded'}))
            return {id: arg}
        } else {
            handleServerAppError(dispatch, res.data)
            return rejectWithValue(null)
        }
    } catch (e) {
        handleServerNetworkError(e, dispatch)
        return rejectWithValue(null)
    }
})
const addTodolist = createAppAsyncThunk<{ todolist: GetTodoType }, string>('todolists/addTodolist', async (arg, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI
    try {
        dispatch(appActions.setAppStatus({status: 'loading'}))
        const res = await todolistApi.addTodolist(arg)
        if (res.data.resultCode === ResultCode.Success) {
            dispatch(appActions.setAppStatus({status: 'succeeded'}))
            return {todolist: res.data.data.item}
        } else {
            handleServerAppError<{ item: GetTodoType }>(dispatch, res.data)
            return rejectWithValue(null)
        }
    } catch (e) {
        handleServerNetworkError(e, dispatch)
        return rejectWithValue(null)
    }
})
const updateTodolistTitle = createAppAsyncThunk<IUpdateTodolistTitleArgs, IUpdateTodolistTitleArgs>('todolists/updateTodolistTitle', async (arg, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI
    try {
        dispatch(appActions.setAppStatus({status: 'loading'}))
        const res = await todolistApi.updateTodolist(arg.id, arg.title)
        if (res.data.resultCode === ResultCode.Success) {
            dispatch(appActions.setAppStatus({status: 'succeeded'}))
            return arg
        } else {
            handleServerAppError(dispatch, res.data)
            return rejectWithValue(null)
        }
    } catch (e) {
        handleServerNetworkError(e, dispatch)
        return rejectWithValue(null)
    }
})

const slice = createSlice({
    name: 'todolists',
    initialState,
    reducers: {
        changeTodolistFilter: ((state, action: PayloadAction<{ id: string, filter: FilterType }>) => {
            const todolist = state.findIndex(todo => todo.id === action.payload.id)
            if (todolist !== -1) state[todolist].filter = action.payload.filter
        }),
        changeTodolistEntityStatus: ((state, action: PayloadAction<{ id: string, entityStatus: RequestStatusType }>) => {
            const todolist = state.findIndex(todo => todo.id === action.payload.id)
            if (todolist !== -1) state[todolist].entityStatus = action.payload.entityStatus
        }),
    },
    extraReducers: builder => {
        builder
            .addCase(clearTasksAndTodolists.type, () => {
                return []
            })
            .addCase(fetchTodolists.fulfilled, (state, action) => {
                return action.payload.todolists.map((tl) => {
                    return {...tl, filter: 'all', entityStatus: 'idle'}
                })
            })
            .addCase(removeTodolist.fulfilled, (state, action) => {
                const todolist = state.findIndex(todo => todo.id === action.payload.id)
                if (todolist !== -1) state.splice(todolist, 1)
            })
            .addCase(addTodolist.fulfilled, (state, action) => {
                state.unshift({...action.payload.todolist, filter: 'all', entityStatus: 'idle'})
            })
            .addCase(updateTodolistTitle.fulfilled, (state, action) => {
                const todolist = state.findIndex(todo => todo.id === action.payload.id)
                if (todolist !== -1) state[todolist].title = action.payload.title
            })
    }
})

export const todolistsReducer = slice.reducer
export const todolistsActions = slice.actions
export const todolistsThunks = {fetchTodolists, removeTodolist, addTodolist, updateTodolistTitle}




