import React from 'react'
import classes from './Loader.module.css'
export default function Loader(props) {
    let white = {
        border: "8px solid white",
        borderColor: "white transparent transparent transparent"
    }
    let black = {
        border: "8px solid black",
        borderColor: "black transparent transparent transparent"
    }
    let style = props.color == "white" ? white : black;
    return (
        <div className={classes.ldsRing}>
            <div style={style}></div>
            <div style={style}></div>
            <div style={style}></div>
            <div style={style}></div>
        </div>
    )
}
