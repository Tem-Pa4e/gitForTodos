import React, {useState} from 'react';
import {v1} from 'uuid';
import './App.css';
import {Todolist} from "./component/todolist/Todolist";
import {AddItemForm} from "./component/addItem/AddItemForm";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type FilterType = 'all' | 'active' | 'completed'
export type TodolistType = {
    id: string
    title: string
    filter: FilterType
}


export const App = () => {

    const todolistId1 = v1()
    const todolistId2 = v1()

    const [todolists, setTodolists] = useState<Array<TodolistType>>([
            {id: todolistId1, title: 'What to learn', filter: 'all'},
            {id: todolistId2, title: 'What to buy', filter: 'all'},
        ]
    )
    const [tasks, setTasks] = useState({
            [todolistId1]: [{id: v1(), title: 'JS', isDone: true},
                {id: v1(), title: 'React', isDone: false},
                {id: v1(), title: 'HTML', isDone: true},
                {id: v1(), title: 'CSS', isDone: false},],
            [todolistId2]: [{id: v1(), title: 'Pencil', isDone: true},
                {id: v1(), title: 'Computer', isDone: true},
                {id: v1(), title: 'Notebook', isDone: true},
                {id: v1(), title: 'Food', isDone: false},],
        }
    )

    const deleteTodolist = (todolistId: string) => {
        setTodolists(todolists.filter(tl => tl.id !== todolistId))
        delete tasks[todolistId]
        setTasks({...tasks})
    }
    const changeStatus = (todolistId: string, taskId: string, value: boolean) => {
        const taskForTodo = tasks[todolistId]
        tasks[todolistId] = taskForTodo.map(t => t.id === taskId ? {...t, isDone: value} : t)
        setTasks({...tasks})
    }
    const deleteTask = (todolistId: string, taskId: string) => {
        const taskForTodo = tasks[todolistId]
        tasks[todolistId] = taskForTodo.filter(t => t.id !== taskId)
        setTasks({...tasks})
    }
    const addTask = (todolistId: string, title: string) => {
        const newTask = {id: v1(), title, isDone: false}
        let taskForTodo = tasks[todolistId]
        tasks[todolistId] = [newTask, ...taskForTodo]
        setTasks({...tasks})
    }

    const changeFilter = (todolistId: string, value: FilterType) => {
        setTodolists(todolists.map(tl => tl.id === todolistId ? {...tl, filter: value} : tl))
    }
    const addTodolist = (title: string) => {
        const newTodos: TodolistType = {id: v1(), title, filter: 'all'}
        setTodolists([newTodos, ...todolists])
    }
    const changeTasktitle = (todolistId: string, taskId: string, title: string) => {
        const taskForTodo = tasks[todolistId]
        tasks[todolistId] = taskForTodo.map(t => t.id === taskId ? {...t, title}: t)
        setTasks({...tasks})
    }
    const changeTodolistTitle = (todolistId: string, title: string) => {
        setTodolists(todolists.map(tl => tl.id === todolistId ? {...tl, title}: tl))
    }
    return (
        <div className="App">
            <AddItemForm addItem={addTodolist}/>
            {todolists.map(tl => {
                let taskForTodolist = tasks[tl.id]
                if (tl.filter === "active") {
                    taskForTodolist = tasks[tl.id].filter(t => !t.isDone)
                }
                if (tl.filter === "completed") {
                    taskForTodolist = tasks[tl.id].filter(t => t.isDone)
                }
                return <Todolist key={tl.id}
                                 id={tl.id}
                                 title={tl.title}
                                 tasks={taskForTodolist}
                                 deleteTask={deleteTask}
                                 filter={tl.filter}
                                 changeFilter={changeFilter}
                                 addTask={addTask}
                                 changeStatus={changeStatus}
                                 deleteTodolists={deleteTodolist}
                                 onChangeTaskTitle={changeTasktitle}
                                 changeTodolistTitle={changeTodolistTitle}
                />
            })

            }

        </div>
    );
}
