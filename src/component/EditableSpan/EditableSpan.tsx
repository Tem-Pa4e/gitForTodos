import React, {ChangeEvent, useState} from 'react';


type EditableSpanPropsType = {
    title: string
    onChangeTitle: (title: string) => void
}

export const EditableSpan = (props: EditableSpanPropsType) => {
    const [editMode, setEditMpde] = useState(false)
    const [title, setTitle] = useState(props.title)
    const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const activateEditMode = () => {
        setEditMpde(true)
        setTitle(props.title)
    }
    const offEditMode = () => {
        setEditMpde(false)
        props.onChangeTitle(title)
    }

    return editMode ?
        <input value={title} onChange={onChangeTitle}  autoFocus onBlur={offEditMode}/> :
        <span onDoubleClick={activateEditMode}>{props.title}</span>
};

