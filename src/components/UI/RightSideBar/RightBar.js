import React from 'react'
import classes from './RightBar.module.css'
export default function RightBar() {
    
    return (
        <div className={classes.right}>
            <input placeholder="Search Twitter" className={classes.input}></input>
        </div>
    )
}
