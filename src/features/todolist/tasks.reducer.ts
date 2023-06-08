import {todolistApi} from "api/todolist-api";
import {CreatedTaskEntityType, IUpdateTaskArgs, IRemoveTaskArgs, TasksStateType, TaskType} from "typing/typing";
import {handleServerAppError, handleServerNetworkError} from "utils/error-utils";
import {appActions} from "state/app-reducer";
import {createSlice} from "@reduxjs/toolkit";
import {todolistsActions} from "features/todolist/todolists-reducer";
import {clearTasksAndTodolists} from "common/actions/common.actions";
import {createAppAsyncThunk} from "utils/create-app-async-thunk";

const initialState: TasksStateType = {}

const fetchTasks = createAppAsyncThunk<{ id: string, tasks: TaskType[] }, string>('tasks/fetchTasks', async (arg, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI
    dispatch(appActions.setAppStatus({status: 'loading'}))
    try {
        const res = await todolistApi.getTasks(arg)
        dispatch(appActions.setAppStatus({status: 'succeeded'}))
        return {id: arg, tasks: res.data.items}
    } catch (e) {
        handleServerNetworkError(e, dispatch)
        return rejectWithValue(null)
    }
})
const addTask = createAppAsyncThunk<{ task: TaskType }, { id: string, title: string }>('tasks/addTask', async (arg, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI
    try {
        dispatch(appActions.setAppStatus({status: 'loading'}))
        const res = await todolistApi.createTask(arg.id, arg.title)
        if (res.data.resultCode === 0) {
            dispatch(appActions.setAppStatus({status: 'succeeded'}))
            return {task: res.data.data.item}
        } else {
            handleServerAppError<{ item: TaskType }>(dispatch, res.data)
            return rejectWithValue(null)
        }
    } catch (e) {
        handleServerNetworkError(e, dispatch)
        return rejectWithValue(null)
    }
})
const removeTask = createAppAsyncThunk<IRemoveTaskArgs, IRemoveTaskArgs>('tasks/removeTask', async (arg, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI
    try {
        dispatch(appActions.setAppStatus({status: 'loading'}))
        const res = await todolistApi.deleteTask(arg.id, arg.taskId)
        if (res.data.resultCode === 0) {
            dispatch(appActions.setAppStatus({status: 'succeeded'}))
            return arg
        } else {
            handleServerAppError(dispatch, res.data)
            return rejectWithValue(null)
        }
    } catch (e) {
        handleServerNetworkError(e, dispatch)
        return rejectWithValue(null)
    }
})
const updateTask = createAppAsyncThunk<IUpdateTaskArgs, IUpdateTaskArgs>('tasks/updateTask', async (arg, thunkAPI) => {
    const {dispatch, rejectWithValue, getState} = thunkAPI
    try {
        dispatch(appActions.setAppStatus({status: 'loading'}))
        const actualState = getState().tasks
        const arrayTasks = actualState[arg.id]
        const task = arrayTasks.find(t => t.id === arg.taskId)
        if (!task) {
            dispatch(appActions.setAppError({error: 'Task not found in the state'}))
            return rejectWithValue(null)
        }

        const apiModel: CreatedTaskEntityType = {
            title: task.title,
            startDate: task.startDate,
            priority: task.priority,
            description: task.description,
            deadline: task.deadline,
            status: task.status,
            ...arg.model
        }

        const res = await todolistApi.updateTask(arg.id, arg.taskId, apiModel)
        if (res.data.resultCode === 0) {
            dispatch(appActions.setAppStatus({status: 'succeeded'}))
            return arg
        } else {
            handleServerAppError<{ item: CreatedTaskEntityType }>(dispatch, res.data)
            return rejectWithValue(null)
        }

    } catch (e) {
        handleServerNetworkError(e, dispatch)
        return rejectWithValue(null)
    }
})

const slice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(todolistsActions.addTodolist, ((state, action) => {
                state[action.payload.todolist.id] = []
            }))
            .addCase(todolistsActions.removeTodolist, ((state, action) => {
                delete state[action.payload.id]
            }))
            .addCase(todolistsActions.setTodolist, ((state, action) => {
                action.payload.todolists.forEach((tl) => {
                    state[tl.id] = []
                })
            }))
            .addCase(clearTasksAndTodolists.type, () => {
                return {}
            })
            .addCase(fetchTasks.fulfilled, (state, action) => {
                state[action.payload.id] = action.payload.tasks
            })
            .addCase(addTask.fulfilled, (state, action) => {
                state[action.payload.task.todoListId].unshift(action.payload.task)
            })
            .addCase(removeTask.fulfilled, (state, action) => {
                const task = state[action.payload.id].findIndex(task => task.id === action.payload.taskId)
                if (task !== -1) state[action.payload.id].splice(task, 1)
            })
            .addCase(updateTask.fulfilled, (state, action) => {
                const tasks = state[action.payload.id]
                const index = tasks.findIndex(t => t.id === action.payload.taskId)
                if (index !== -1) tasks[index] = {...tasks[index], ...action.payload.model}
            })
    }
})

export const tasksReducer = slice.reducer
export const tasksActions = slice.actions
export const tasksThunks = {fetchTasks, addTask, removeTask, updateTask}





