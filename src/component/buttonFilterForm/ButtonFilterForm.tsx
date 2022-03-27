import React from 'react';
import {Button} from "../button/Button";
import {FilterType} from "../../App";

type ButtonFilterFormType = {
    changeFilter: (todolistId: string, value: FilterType) => void
    filter: FilterType
    id: string
}

export const ButtonFilterForm = (props: ButtonFilterFormType) => {
    const changeAllFilter = () => {
        props.changeFilter(props.id, 'all')
    }
    const changeActiveFilter = () => {
        props.changeFilter(props.id, 'active')
    }
    const changeCompletedFilter = () => {
        props.changeFilter(props.id, 'completed')
    }
    return (
        <div>
            <Button style={props.filter === 'all' ? 'active-filter' : ''} title={'all'} callBack={changeAllFilter}/>
            <Button style={props.filter === 'active' ? 'active-filter' : ''} title={'active'}
                    callBack={changeActiveFilter}/>
            <Button style={props.filter === 'completed' ? 'active-filter' : ''} title={'completed'}
                    callBack={changeCompletedFilter}/>
        </div>
    );
};

