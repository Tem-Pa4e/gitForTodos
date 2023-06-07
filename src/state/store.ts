import {AnyAction, combineReducers} from "redux";
import {tasksReducer} from "./tasks-reducer";
import {todolistsReducer} from "./todolists-reducer";
import {appReducer} from "./app-reducer";
import {authReducer} from "state/auth-reducer";
import {configureStore, ThunkAction} from "@reduxjs/toolkit";

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

export type AppThunk = ThunkAction<any, AppRootStateType, unknown, AnyAction>

// @ts-ignore
window.store = store