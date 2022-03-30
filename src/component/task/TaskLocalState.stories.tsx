import React, {useState} from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import {action} from "@storybook/addon-actions";
import {Task} from './Task';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Todolist/Task',
    component: Task,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    args: {
        deleteTask: action('removeTask'),
        onChangeTaskTitle: action('changedTaskTitle')
    },
} as ComponentMeta<typeof Task>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Task> = (args) => {
    const [task, setTask] = useState({id: '1', title: 'React', isDone: true})
    const onChangeTaskStatus = () => setTask({id: '1', title: 'React', isDone: !task.isDone})


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


