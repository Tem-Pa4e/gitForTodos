import {FilterType, TodolistType} from "../App"
import {v1} from "uuid";

const initialState:Array<TodolistType> = []

export const todolistsReducer = (state = initialState, action: ActionTodolistType): Array<TodolistType> => {
    switch (action.type) {
        case "REMOVE-TODOLIST": {
            return state.filter(tl => tl.id !== action.todolistId)
        }
        case "ADD-TODOLIST": {
            const newTodo: TodolistType = {id: action.todolistId, title: action.title, filter: 'all'}
            return [newTodo, ...state]
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
export const AddTodoAC = (title: string) => ({type: 'ADD-TODOLIST', todolistId: v1(), title} as const)
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

type ActionTodolistType = RemoveTodoAT | AddTodoAT | ReturnType<typeof ChangeTodoTitleAC>| ReturnType<typeof ChangeTodoFilterAC>
export type RemoveTodoAT = ReturnType<typeof RemoveTodoAC>
export type AddTodoAT = ReturnType<typeof AddTodoAC>

