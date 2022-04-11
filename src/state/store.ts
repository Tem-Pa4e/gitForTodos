import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from "redux-thunk";
import {tasksReducer} from "./tasks-reducer";
import {todolistsReducer} from "./todolists-reducer";
import {appReducer} from "./app-reducer";
import {loginReducer} from "./login-Reducer";


const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
    app: appReducer,
    login: loginReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunk))
export type AppRootStateType = ReturnType<typeof rootReducer>

// @ts-ignore
window.store = store