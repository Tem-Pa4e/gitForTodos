import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import {action} from "@storybook/addon-actions";
import {Task} from './Task';
import {TaskPriorities, TaskStatuses} from "../../api/todolist-api";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Todolist/Task',
    component: Task,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    args: {
        deleteTask: action('removeTask'),
        onChangeTaskStatus: action('changedTaskStatus'),
        onChangeTaskTitle: action('changedTaskTitle')
    },
} as ComponentMeta<typeof Task>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Task> = (args) => <Task {...args} />;

export const TaskIsDoneStory = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
TaskIsDoneStory.args = {
    task: {
        id: '1',
        title: 'React',
        status: TaskStatuses.Completed,
        description: '',
        startDate: '',
        priority: TaskPriorities.Low,
        addedDate: '',
        deadline: '',
        todoListId: '1',
        order: 0
    },
};

export const TaskIsNotDoneStory = Template.bind({});
TaskIsNotDoneStory.args = {
    task: {
        id: '1',
        title: 'React',
        status: TaskStatuses.New,
        description: '',
        startDate: '',
        priority: TaskPriorities.Low,
        addedDate: '',
        deadline: '',
        todoListId: '1',
        order: 0
    },
}

