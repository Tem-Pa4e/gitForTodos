import {
    AddTodoAC,
    ChangeTodoFilterAC,
    ChangeTodoTitleAC,
    RemoveTodoAC,
    SetTodoAC,
    todolistsReducer,
    TodolistStateType
} from './todolists-reducer';
import {v1} from 'uuid';
import {FilterType} from "../typing/typing";


let todolistId1: string
let todolistId2: string
let startState: Array<TodolistStateType>
beforeEach(() => {
    todolistId1 = v1()
    todolistId2 = v1()
    startState = [
        {id: todolistId1, title: "What to learn", order: 0, addedDate: '', filter: "all"},
        {id: todolistId2, title: "What to buy", order: 0, addedDate: '', filter: "all"}
    ]
})

test('correct todolist should be removed', () => {
    const endState = todolistsReducer(startState, RemoveTodoAC(todolistId1))

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});
test('correct todolist should be added', () => {
    let newTodolistTitle = "New Todolist";
    const endState = todolistsReducer(startState, AddTodoAC({
        title: newTodolistTitle,
        addedDate: '',
        order: 0,
        id: 'newTodoId'
    }))

    expect(endState.length).toBe(3);
    expect(endState[0].title).toBe(newTodolistTitle);
});
test('correct todolist should change its name', () => {
    let newTodolistTitle = "New Todolist";
    const action = {
        type: 'CHANGE-TODOLIST-TITLE',
        id: todolistId2,
        title: newTodolistTitle
    };
    const endState = todolistsReducer(startState, ChangeTodoTitleAC(action.id, action.title));

    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newTodolistTitle);
});
test('correct filter of todolist should be changed', () => {
    let newFilter: FilterType = "completed";
    const action = {
        type: 'CHANGE-TODOLIST-FILTER',
        id: todolistId2,
        filter: newFilter
    };
    const endState = todolistsReducer(startState, ChangeTodoFilterAC(action.id, action.filter));

    expect(endState[0].filter).toBe("all");
    expect(endState[1].filter).toBe(newFilter);
});
test('todolists should be set to the state', () => {
    const action = SetTodoAC(startState)
    const endState = todolistsReducer([], action);

    expect(endState.length).toBe(2);
});



