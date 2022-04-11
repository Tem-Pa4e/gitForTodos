import {Dispatch} from "redux"
import {ActionsAppReducerType, SetAppStatusAC} from "./app-reducer";
import {authAPI, LoginParamsType} from "../api/todolist-api";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";
import {AxiosError} from "axios";

const initialState = {
    isLoggedIn: false
}
type InitialStateType = typeof initialState

export const loginReducer = (state: InitialStateType = initialState, action: ActionsLoginType): InitialStateType => {
    switch (action.type) {
        case 'login/SET-IS-LOGGED-IN':
            return {...state, isLoggedIn: action.value}
        default:
            return state
    }
}
// actions
export const setIsLoggedInAC = (value: boolean) =>
    ({type: 'login/SET-IS-LOGGED-IN', value} as const)

// thunks
export const loginTC = (data: LoginParamsType) => (dispatch: Dispatch<ActionsLoginType>) => {
    dispatch(SetAppStatusAC('loading'))
    authAPI.login(data)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC(true))
                dispatch(SetAppStatusAC('succeeded'))
            } else {
                handleServerAppError(dispatch, res.data)
            }
        })
        .catch((err: AxiosError) => {
            handleServerNetworkError(dispatch, err.message)
        })
}
export const logoutTC = () => (dispatch: Dispatch<ActionsLoginType>) => {
    dispatch(SetAppStatusAC('loading'))
    authAPI.logout()
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC(false))
                dispatch(SetAppStatusAC('succeeded'))
            } else {
                handleServerAppError(dispatch, res.data)
            }
        })
        .catch((err: AxiosError) => {
            handleServerNetworkError(dispatch, err.message)
        })
}

// types
export type SetISLoggedInType = ReturnType<typeof setIsLoggedInAC>
export type ActionsLoginType = SetISLoggedInType | ActionsAppReducerType
