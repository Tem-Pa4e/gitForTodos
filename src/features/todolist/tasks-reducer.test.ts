import {tasksReducer, tasksThunks} from 'features/todolist/tasks.reducer';
import {todolistsActions, todolistsReducer, TodolistStateType} from "features/todolist/todolists-reducer";
import {TaskPriorities, TasksStateType, TaskStatuses} from "typing/typing";

let startState: TasksStateType
beforeEach(() => {
    startState = {
        "todolistId1": [
            {
                id: "1", title: "CSS", status: TaskStatuses.Completed,
                description: '',
                startDate: '',
                priority: TaskPriorities.Low,
                addedDate: '',
                deadline: '',
                todoListId: '1',
                order: 0
            },
            {
                id: "2", title: "JS", status: TaskStatuses.Completed,
                description: '',
                startDate: '',
                priority: TaskPriorities.Low,
                addedDate: '',
                deadline: '',
                todoListId: '1',
                order: 0
            },
            {
                id: "3", title: "React", status: TaskStatuses.New,
                description: '',
                startDate: '',
                priority: TaskPriorities.Low,
                addedDate: '',
                deadline: '',
                todoListId: '1',
                order: 0
            }
        ],
        "todolistId2": [
            {
                id: "1", title: "bread", status: TaskStatuses.New,
                description: '',
                startDate: '',
                priority: TaskPriorities.Low,
                addedDate: '',
                deadline: '',
                todoListId: '1',
                order: 0
            },
            {
                id: "2", title: "milk", status: TaskStatuses.New,
                description: '',
                startDate: '',
                priority: TaskPriorities.Low,
                addedDate: '',
                deadline: '',
                todoListId: '1',
                order: 0
            },
            {
                id: "3", title: "tea", status: TaskStatuses.Completed,
                description: '',
                startDate: '',
                priority: TaskPriorities.Low,
                addedDate: '',
                deadline: '',
                todoListId: '1',
                order: 0
            }
        ]
    };
})

test('correct task should be deleted from correct array', () => {
    const action = tasksThunks.removeTask.fulfilled({id: "todolistId2", taskId: "2"}, 'reqestId', {id: "todolistId2", taskId: "2"});
    const endState = tasksReducer(startState, action)

    expect(endState['todolistId1'].length).toBe(3)
    expect(endState['todolistId2'].length).toBe(2)
});

test('correct task should be added to correct array', () => {
    const action = tasksThunks.addTask.fulfilled({task: {
            description: '',
            todoListId: "todolistId2",
            title: 'juce',
            status: TaskStatuses.New,
            addedDate: '',
            deadline: '',
            order: 0,
            priority: 0,
            startDate: '',
            id: 'exist'
        }}, 'requestId', {id: "todolistId2", title: 'juce'})
    const endState = tasksReducer(startState, action)

    expect(endState["todolistId1"].length).toBe(3);
    expect(endState["todolistId2"].length).toBe(4);
    expect(endState["todolistId2"][0].id).toBeDefined();
    expect(endState["todolistId2"][0].title).toBe('juce');
    expect(endState["todolistId2"][0].status).toBe(TaskStatuses.New);
})
test('status of specified task should be changed', () => {
    const action = tasksThunks.updateTask.fulfilled({id: "todolistId2", taskId: '2', model: {status: TaskStatuses.New}}, 'requestId', {id: "todolistId2", taskId: '2', model: {status: TaskStatuses.New}} );
    const endState = tasksReducer(startState, action)

    expect(endState['todolistId1'][1].status).toBe(TaskStatuses.Completed);
    expect(endState['todolistId2'][1].status).toBe(TaskStatuses.New);
});
test('title of specified task should be changed', () => {
    const action = tasksThunks.updateTask.fulfilled({id: "todolistId2", taskId: '2', model: {title: 'changed'}}, 'requestId', {id: "todolistId2", taskId: '2', model: {title: 'changed'}});
    const endState = tasksReducer(startState, action)

    expect(endState['todolistId1'][1].title).toBe('JS');
    expect(endState['todolistId2'][1].title).toBe('changed');
});
test('ids should be equals', () => {
    const startTasksState: TasksStateType = {};
    const startTodolistsState: Array<TodolistStateType> = [];

    const action = todolistsActions.addTodolist({todolist: {title: "new todolist", addedDate: '', order: 0, id: 'newTodoId'}});
    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todolistsReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodolists = endTodolistsState[0].id;

    expect(idFromTasks).toBe(action.payload.todolist.id);
    expect(idFromTodolists).toBe(action.payload.todolist.id);
});
test('new array should be added when new todolist is added', () => {
    const action = todolistsActions.addTodolist({todolist: {title: "new todolist", addedDate: '', order: 0, id: 'newTodoId'}});
    const endState = tasksReducer(startState, action)

    const keys = Object.keys(endState);
    // eslint-disable-next-line eqeqeq
    const newKey = keys.find(k => k != "todolistId1" && k != "todolistId2");
    if (!newKey) {
        throw Error("new key should be added")
    }

    expect(keys.length).toBe(3);
    expect(endState[newKey]).toEqual([]);
});

test('property with todolistId should be deleted', () => {
    const action = todolistsActions.removeTodolist({id: "todolistId2"});
    const endState = tasksReducer(startState, action)
    const keys = Object.keys(endState);

    expect(keys.length).toBe(1);
    expect(endState["todolistId2"]).not.toBeDefined();
});

test('empty arrays should be added when we set todolists', () => {
    const action = todolistsActions.setTodolist({todolists: [
            {id: "1", title: "CSS", order: 0, addedDate: ''},
            {id: "2", title: "JS", order: 0, addedDate: ''},
            {id: "3", title: "React", order: 0, addedDate: ''}]}
    );
    const endState = tasksReducer({}, action)
    const keys = Object.keys(endState);

    expect(keys.length).toBe(3);
});

test('task should be added for todo', () => {
    const action = tasksThunks.fetchTasks.fulfilled({id: 'todolistId1', tasks: startState['todolistId1']}, 'requestId ', 'todolistId1');
    const endState = tasksReducer({
        'todolistId2': [],
        'todolistId1': []
    }, action)

    expect(endState['todolistId1'].length).toBe(3);
    expect(endState['todolistId2'].length).toBe(0);
});