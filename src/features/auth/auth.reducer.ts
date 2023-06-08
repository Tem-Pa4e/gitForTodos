import {authAPI, LoginParamsType} from "api/todolist-api";
import {handleServerAppError, handleServerNetworkError} from "utils/error-utils";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AppThunk} from "state/store";
import {appActions} from "state/app-reducer";
import {clearTasksAndTodolists} from "common/actions/common.actions";

const initialState = {
    isLoggedIn: false
}

const slice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setIsLoggedIn: ((state, action: PayloadAction<{isLoggedIn: boolean}>) => {
            state.isLoggedIn = action.payload.isLoggedIn
        })
    }
})

export const authReducer = slice.reducer
export const authActions = slice.actions

// thunks
export const loginTC = (data: LoginParamsType): AppThunk => (dispatch) => {
    dispatch(appActions.setAppStatus({status: 'loading'}))
    authAPI.login(data)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(authActions.setIsLoggedIn({isLoggedIn: true}))
                dispatch(appActions.setAppStatus({status: 'succeeded'}))
            } else {
                handleServerAppError(dispatch, res.data)
            }
        })
        .catch((err) => {
            handleServerNetworkError(dispatch, err)
        })
}
export const logoutTC = (): AppThunk => (dispatch) => {
    dispatch(appActions.setAppStatus({status: 'loading'}))
    authAPI.logout()
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(authActions.setIsLoggedIn({isLoggedIn: false}))
                dispatch(appActions.setAppStatus({status: 'succeeded'}))
                dispatch(clearTasksAndTodolists())
            } else {
                handleServerAppError(dispatch, res.data)
            }
        })
        .catch((err) => {
            handleServerNetworkError(dispatch, err)
        })
}

