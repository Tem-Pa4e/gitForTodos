import {FilterType} from "../App"
import {GetTodoType, todolistApi} from "../api/todolist-api";
import { Dispatch } from "redux";



const initialState: Array<TodolistStateType> = []
export type TodolistStateType = GetTodoType & {
    filter: FilterType
}

export const todolistsReducer = (state = initialState, action: ActionTodolistType): Array<TodolistStateType> => {
    switch (action.type) {
        case "SET-TODOLIST": {
            return action.todolists.map(tl=> ({
                ...tl,
                filter: 'all'
            }))
        }
        case "REMOVE-TODOLIST": {
            return state.filter(tl => tl.id !== action.todolistId)
        }
        case "ADD-TODOLIST": {
            return [{...action.todolist, filter: 'all'}, ...state]
        }
        case "CHANGE-TODOLIST-TITLE": {
            return state.map(tl => tl.id === action.todolistId ? {...tl, title: action.title} : tl)
        }
        case "CHANGE-TODOLIST-FILTER": {
            return state.map(tl => tl.id === action.todolistId ? {...tl, filter: action.filter} : tl)
        }

        default:
            return state
    }
}


export const RemoveTodoAC = (todolistId: string) => ({type: 'REMOVE-TODOLIST', todolistId} as const)
export const AddTodoAC = (todolist: GetTodoType) => ({type: 'ADD-TODOLIST', todolist} as const)
export const ChangeTodoTitleAC = (todolistId: string, title: string) => ({
    type: 'CHANGE-TODOLIST-TITLE',
    todolistId,
    title
} as const)
export const ChangeTodoFilterAC = (todolistId: string, filter: FilterType) => ({
    type: 'CHANGE-TODOLIST-FILTER',
    todolistId,
    filter
} as const)
export const SetTodoAC = (todolists: Array<GetTodoType>) => ({type: 'SET-TODOLIST', todolists}as const)

type ActionTodolistType =
    RemoveTodoAT
    | AddTodoAT
    | ReturnType<typeof ChangeTodoTitleAC>
    | ReturnType<typeof ChangeTodoFilterAC>
    | SetTodoAT
export type SetTodoAT = ReturnType<typeof SetTodoAC>
export type RemoveTodoAT = ReturnType<typeof RemoveTodoAC>
export type AddTodoAT = ReturnType<typeof AddTodoAC>


export const fetchTodosTC = () => {
    return (dispatch: Dispatch) => {
        todolistApi.getTodos()
            .then(res=> {
                dispatch(SetTodoAC(res.data))
            })
    }
}
export const removeTodoTC = (todolistId: string) => {
    return (dispatch: Dispatch) => {
        todolistApi.deleteTodo(todolistId)
            .then(res=> {
                dispatch(RemoveTodoAC(todolistId))
            })
    }
}
export const createTodoTC = (title: string) => {
    return (dispatch: Dispatch) => {
        todolistApi.createTodo(title)
            .then(res => {
                dispatch(AddTodoAC(res.data.data.item))
            })
    }
}
export const updateTodoTitleTC = (todolistId: string, title: string) => {
    return (dispatch: Dispatch) => {
        todolistApi.updateTodo(todolistId, title)
            .then(res => {
                dispatch(ChangeTodoTitleAC(todolistId,title))
            })
    }
}

