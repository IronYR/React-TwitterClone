import React from 'react'
import classes from './Header.module.css';
// import Back from '../../../images/leftArrow.svg'
export default function Header(props) {
    return (
        <div className={classes.header}>
            {props.showBackButton ? <img onClick={props.goBack} src={Back} alt=""/>: null}
            <span className={classes.title}>{props.title}</span>
            <button onClick={props.logout} className={classes.logout}>Log Out</button>
        </div>
    )
}
