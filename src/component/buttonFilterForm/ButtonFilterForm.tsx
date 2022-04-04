import React, {useCallback} from 'react';
import { FilterType } from '../../typing/typing';
import {ButtonFilter} from "../buttonFilter/ButtonFilter";

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
        <div>
            <ButtonFilter color={'inherit'} variant={props.filter === 'all' ? 'contained' : 'text'} title={'all'}
                          callBack={changeAllFilter}/>
            <ButtonFilter color={'inherit'} variant={props.filter === 'active' ? 'contained' : 'text'} title={'active'}
                          callBack={changeActiveFilter}/>
            <ButtonFilter color={'inherit'} variant={props.filter === 'completed' ? 'contained' : 'text'}
                          title={'completed'}
                          callBack={changeCompletedFilter}/>
        </div>
    );
};

