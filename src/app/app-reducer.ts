import {Dispatch} from "redux";
import {handleServerAppError, handleServerNetworkError} from "common/utils";
import {authActions} from "features/auth/auth.reducer";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AppThunk} from "app/store";
import {authAPI} from "features/auth/auth.api";

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
    status: 'idle' as RequestStatusType,
    error: null as string | null,
    isInitialized: false as boolean
}

const slice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setAppIsInitialized: ((state, action: PayloadAction<{isInitialized: boolean}>) => {
            state.isInitialized = action.payload.isInitialized
        }),
        setAppError: ((state, action: PayloadAction<{error: string| null}>) => {
            state.error = action.payload.error
        }),
        setAppStatus: ((state, action: PayloadAction<{status: RequestStatusType}>) => {
            state.status = action.payload.status
        })
    }
})

export const appReducer = slice.reducer
export const appActions = slice.actions

export const initializeAppTC = (): AppThunk => (dispatch: Dispatch) => {

    authAPI.me().then(res => {
        if (res.data.resultCode === 0) {
            dispatch(authActions.setIsLoggedIn({isLoggedIn: true}));

        } else {
            handleServerAppError(dispatch, res.data)
        }
    })
        .catch((err)=> {
            handleServerNetworkError(dispatch, err)
        })
        .finally(()=> {
            dispatch(appActions.setAppIsInitialized({isInitialized: true}))
        })
}

