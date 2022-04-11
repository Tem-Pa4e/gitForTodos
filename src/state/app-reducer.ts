import {Dispatch} from "redux";
import {authAPI} from "../api/todolist-api";
import {ActionsLoginType, setIsLoggedInAC, SetISLoggedInType} from "./login-Reducer";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";
import {AxiosError} from "axios";

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
    status: 'idle' as RequestStatusType,
    error: null as string | null,
    isInitialized: false as boolean
}

type InitialStateType = typeof initialState

export const appReducer = (state: InitialStateType = initialState, action: ActionsAppReducerType): InitialStateType => {
    switch (action.type) {
        case "APP/SET-IS-INITIALIZED":
            return {...state, isInitialized: action.isInitialized}
        case 'APP/SET-ERROR':
            return {...state, error: action.error}
        case 'APP/SET-STATUS':
            return {...state, status: action.status}

        default:
            return state
    }

}

export type ActionsAppReducerType = SetAppIsInitializedAT | SetAppStatusAT | SetAppErrorAT | SetISLoggedInType

export const SetAppStatusAC = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', status}as const)
export type SetAppStatusAT = ReturnType<typeof SetAppStatusAC>
export const SetAppErrorAC = (error: string| null) => ({type: 'APP/SET-ERROR', error}as const)
export const SetAppIsInitializedAC = (isInitialized: boolean) => ({type: 'APP/SET-IS-INITIALIZED', isInitialized}as const)
export type SetAppErrorAT = ReturnType<typeof SetAppErrorAC>
export type SetAppIsInitializedAT = ReturnType<typeof SetAppIsInitializedAC>


export const initializeAppTC = () => (dispatch: Dispatch<ActionsAppReducerType>) => {

    authAPI.me().then(res => {
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedInAC(true));

        } else {
            handleServerAppError(dispatch, res.data)
        }
    })
        .catch((err: AxiosError)=> {
            handleServerNetworkError(dispatch, err.message)
        })
        .finally(()=> {
            dispatch(SetAppIsInitializedAC(true))
        })
}

