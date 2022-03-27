import React from 'react';
import {ButtonFilter} from "../buttonFilter/ButtonFilter";
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
            <ButtonFilter color={'inherit'} variant={props.filter === 'all' ? 'contained' : 'text'}  title={'all'} callBack={changeAllFilter}/>
            <ButtonFilter color={'inherit'} variant={props.filter === 'active' ? 'contained' : 'text'}  title={'active'}
                          callBack={changeActiveFilter}/>
            <ButtonFilter color={'inherit'} variant={props.filter === 'completed' ? 'contained' : 'text'}  title={'completed'}
                          callBack={changeCompletedFilter}/>
        </div>
    );
};

