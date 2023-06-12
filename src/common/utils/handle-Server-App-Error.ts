import {Dispatch} from "redux";
import {ResponseType} from "common/types/common.types";
import {appActions} from "app/app-reducer";

export const handleServerAppError = <T>(dispatch: Dispatch, data: ResponseType<T>) => {
    data.messages.length ? dispatch(appActions.setAppError({error: data.messages[0]})) : dispatch(appActions.setAppError({error: 'Some error occurred'}))
    dispatch(appActions.setAppStatus({status: 'failed'}))
}