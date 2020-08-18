import React from 'react'
import classes from './Header.module.css'
export default function Header(props) {
    return (
        <div className={classes.header}>
            <p>{props.showBackButton ? "back": null}</p>
            <p className={classes.title}>{props.title}</p>
        </div>
    )
}
