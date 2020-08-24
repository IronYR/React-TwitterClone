import React from 'react'
// import classes from './Input.module.css' 
export default function Input(props) {
    return (
        <>
            <label htmlFor={props.name}>{props.label}</label>
            <input type={props.type} name={props.name} onChange={(e)=>props.onInputHandler(e,props.name)}/>
        </>
    )
}
