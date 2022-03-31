import axios from "axios";


const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': 'df9468ca-605b-46fc-bc8e-4044e920f223'
    }
})

export const todolistApi = {
    getTodos() {
        return instance.get<TodoType[]>('todo-lists')
    },
    createTodo(title: string) {
        return instance.post<DeleteTodoType<{ item: TodoType }>>('todo-lists', {title})
    },
    deleteTodo(todolistId: string) {
        return instance.delete<DeleteTodoType>(`todo-lists/${todolistId}`)
    },
    updateTodo(todolistId: string, title: string) {
        return instance.put<DeleteTodoType>(`todo-lists/${todolistId}`, {title})
    }
};

type TodoType = {
    addedDate: string
    id: string
    order: number
    title: string
}

type DeleteTodoType<T ={}> = {
    data: T
    fieldsErrors: string[]
    messages: string[]
    resultCode: number
}
