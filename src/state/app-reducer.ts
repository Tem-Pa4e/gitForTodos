
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
    status: 'idle' as RequestStatusType,
    error: null as string | null
}

type InitialStateType = typeof initialState

export const appReducer = (state: InitialStateType = initialState, action: ActionsAppReducerType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-ERROR':
            return {...state, error: action.error}
        case 'APP/SET-STATUS':
            return {...state, status: action.status}

        default:
            return state
    }

}

export type ActionsAppReducerType = SetAppStatusAT | SetAppErrorAT

export const SetAppStatusAC = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', status}as const)
export type SetAppStatusAT = ReturnType<typeof SetAppStatusAC>
export const SetAppErrorAC = (error: string| null) => ({type: 'APP/SET-ERROR', error}as const)
export type SetAppErrorAT = ReturnType<typeof SetAppErrorAC>