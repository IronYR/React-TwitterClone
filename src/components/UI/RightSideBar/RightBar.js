import React from 'react'
import classes from './RightBar.module.css'
export default function RightBar(props) {
    let notEmpty = ()=> (
        <div className={classes.right}>
            <input placeholder="Search Twitter" className={classes.input}></input>
        </div>
    );
    let empty = ()=>(
        <div className={classes.right}></div>
    );
    let text = props.empty ? empty : notEmpty;
    return (
        text()
        
    )
}
