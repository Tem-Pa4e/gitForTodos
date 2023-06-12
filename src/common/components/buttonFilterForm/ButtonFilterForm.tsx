import React, {useCallback} from 'react';
import { FilterType } from 'typing/typing';
import {ButtonComponent} from "common/components/buttonComponent/ButtonComponent";

type ButtonFilterFormType = {
    changeFilter: (todolistId: string, value: FilterType) => void
    filter: FilterType
    id: string
}

export const ButtonFilterForm = (props: ButtonFilterFormType) => {

    const changeAllFilter = useCallback(() => {
        props.changeFilter(props.id, 'all')
    },[props.changeFilter,props.id])
    const changeActiveFilter = useCallback(() => {
        props.changeFilter(props.id, 'active')
    },[props.changeFilter,props.id])
    const changeCompletedFilter = useCallback(() => {
        props.changeFilter(props.id, 'completed')
    },[props.changeFilter,props.id])
    return (
        <div style={{display: 'flex', justifyContent: 'center'}}>
            <ButtonComponent color={'inherit'} variant={props.filter === 'all' ? 'outlined' : 'text'} title={'all'}
                             callBack={changeAllFilter}/>
            <ButtonComponent color={'inherit'} variant={props.filter === 'active' ? 'outlined' : 'text'} title={'active'}
                             callBack={changeActiveFilter}/>
            <ButtonComponent color={'inherit'} variant={props.filter === 'completed' ? 'outlined' : 'text'}
                             title={'completed'}
                             callBack={changeCompletedFilter}/>
        </div>
    );
};

