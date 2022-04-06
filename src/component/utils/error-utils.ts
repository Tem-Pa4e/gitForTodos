import {ActionsAppReducerType, SetAppErrorAC, SetAppStatusAC} from "../app/app-reducer";
import {Dispatch} from "redux";
import {ResponseType} from "../../api/todolist-api";


export const handleServerAppError = <T>(dispatch: Dispatch<ActionsAppReducerType>, data: ResponseType<T>) => {
    data.messages.length ? dispatch(SetAppErrorAC(data.messages[0])) : dispatch(SetAppErrorAC('Some error occurred'))
    dispatch(SetAppStatusAC('failed'))
}


export const handleServerNetworkError = (dispatch: Dispatch<ActionsAppReducerType>, message: string) => {
    dispatch(SetAppErrorAC(message))
    dispatch(SetAppStatusAC('failed'))
}