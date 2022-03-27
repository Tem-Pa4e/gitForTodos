import React from 'react';

type ButtonPropsType = {
    title: string
    callBack: () => void
    style?: string
}

export const Button = (props: ButtonPropsType) => {
    return (
        <button className={props.style} onClick={props.callBack}>{props.title}</button>
    );
};
