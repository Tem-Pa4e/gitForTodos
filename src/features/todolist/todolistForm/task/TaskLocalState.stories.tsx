import React, {useState} from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import {action} from "@storybook/addon-actions";
import {Task} from './Task';
import {TaskType} from 'typing/typing';
import {TaskPriorities, TaskStatuses} from "common/enums/common.enums";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Todolist/Task',
    component: Task,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    args: {
        removeTask: action('removeTask'),
        onChangeTaskTitle: action('changedTaskTitle')
    },
} as ComponentMeta<typeof Task>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Task> = (args) => {
    const [task, setTask] = useState<TaskType>({id: '1', title: 'React', status: TaskStatuses.Completed, description: '', startDate: '', priority: TaskPriorities.Low, addedDate: '', deadline: '', todoListId: '1', order: 0})
    const onChangeTaskStatus = () => setTask({id: '1', title: 'React', status: TaskStatuses.New,
        description: '',
        startDate: '',
        priority: TaskPriorities.Low,
        addedDate: '',
        deadline: '',
        todoListId: '1',
        order: 0})

    return <Task
        deleteTask={args.deleteTask}
        onChangeTaskTitle={args.onChangeTaskTitle}
        task={task}
        onChangeTaskStatus={onChangeTaskStatus}
    />
};

export const TaskStory = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
TaskStory.args = {};


