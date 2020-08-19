import React from 'react'
import classes from './Input.module.css' 
export default function Input(props) {
    return (
        <>
            <label for={props.name}>{props.label}</label>
            <input type={props.type} name={props.name}/>
        </>
    )
}
