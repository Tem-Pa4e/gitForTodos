import {Dispatch} from "redux";
import {ResponseType} from "api/todolist-api";
import {appActions} from "state/app-reducer";


export const handleServerAppError = <T>(dispatch: Dispatch, data: ResponseType<T>) => {
    data.messages.length ? dispatch(appActions.setAppError({error: data.messages[0]})) : dispatch(appActions.setAppError({error: 'Some error occurred'}))
    dispatch(appActions.setAppStatus({status: 'failed'}))
}


export const handleServerNetworkError = (dispatch: Dispatch, message: string) => {
    dispatch(appActions.setAppError({error: message}))
    dispatch(appActions.setAppStatus({status: 'failed'}))
}