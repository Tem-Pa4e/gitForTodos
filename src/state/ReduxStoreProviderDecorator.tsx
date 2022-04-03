import React from 'react';
import {Provider} from "react-redux";
import {AppRootStateType, store} from "./store";
import {combineReducers, createStore} from "redux";
import {tasksReducer} from './tasks-reducer';
import {todolistsReducer} from "./todolists-reducer";
import {v1} from 'uuid';
import {TaskPriorities, TaskStatuses} from "../api/todolist-api";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer
})

const initialGlobalState = {
    todolists: [
        {id: "todolistId1", title: "What to learn", order: 0, addedDate: '', filter: "all"},
        {id: "todolistId2", title: "What to buy", order: 0, addedDate: '', filter: "all"}
    ],
    tasks: {
        ["todolistId1"]: [
            {
                id: v1(), title: "HTML&CSS", status: TaskStatuses.Completed,
                description: '',
                startDate: '',
                priority: TaskPriorities.Low,
                addedDate: '',
                deadline: '',
                todoListId: '1',
                order: 0
            },
            {
                id: v1(), title: "JS", status: TaskStatuses.Completed,
                description: '',
                startDate: '',
                priority: TaskPriorities.Low,
                addedDate: '',
                deadline: '',
                todoListId: '1',
                order: 0
            }
        ],
        ["todolistId2"]: [
            {
                id: v1(), title: "Milk", status: TaskStatuses.Completed,
                description: '',
                startDate: '',
                priority: TaskPriorities.Low,
                addedDate: '',
                deadline: '',
                todoListId: '1',
                order: 0
            },
            {
                id: v1(), title: "React Book", status: TaskStatuses.Completed,
                description: '',
                startDate: '',
                priority: TaskPriorities.Low,
                addedDate: '',
                deadline: '',
                todoListId: '1',
                order: 0
            }
        ]
    }
};

export const storyBookStore = createStore(rootReducer, initialGlobalState as AppRootStateType);

export const ReduxStoreProviderDecorator = (storeFn: () => JSX.Element) => {
    return (
        <Provider store={storyBookStore}>
            {storeFn()}
        </Provider>
    );
};

