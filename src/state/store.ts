import {AnyAction, combineReducers} from "redux";
import {tasksReducer} from "features/todolist/tasks.reducer";
import {todolistsReducer} from "features/todolist/todolists-reducer";
import {appReducer} from "./app-reducer";
import {authReducer} from "features/auth/auth.reducer";
import {configureStore, ThunkAction, ThunkDispatch} from "@reduxjs/toolkit";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
    app: appReducer,
    login: authReducer
})
export const store = configureStore({
    reducer: rootReducer
})

export type AppRootStateType = ReturnType<typeof rootReducer>

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AnyAction>

export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, AnyAction>

// @ts-ignore
window.store = store