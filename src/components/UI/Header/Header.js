import React from 'react'
import classes from './Header.module.css';
// import Back from '../../../images/leftArrow.svg'
export default function Header(props) {
    return (
        <div className={classes.header}>
            {props.showBackButton ? <button onClick={props.goBack} src='' alt="">Back</button>: null}
            <span className={classes.title}>{props.title}</span>
            <button onClick={props.logout} className={classes.logout}>Log Out</button>
        </div>
    )
}
