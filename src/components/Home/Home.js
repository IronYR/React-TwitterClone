import React from 'react'
import classes from './Home.module.css'
import Left from '../UI/LeftSideBar/LeftBar';
import Posts from '../UI/Posts/Posts';
import Right from '../UI/RightSideBar/RightBar'
export default function Home() {
    return (
        <div className={classes.home}>
            <Left />
            <Posts></Posts>
            <Right/>
        </div>
    )
}
