import React from 'react'
import classes from './LeftBar.module.css'
import Twitter from '../../../images/icons8-twitter.svg'
export default function LeftBar(props) {
    return (
        <div className={classes.Left}>
                <a href="#">
                    <img src={Twitter} alt="" className={classes.twitter}></img>
                </a>
                <a href="#">
                Home icon
                </a>
                <a href="#">Notification</a>
                <a href="#">User icon</a>
                <a href="#">Create Post</a>
                <a href="#">User Pic</a>
                <button onClick={props.logout}>LogOut</button>
        </div>
    )
}







// * twitter logo
// * home icon
// * notification
// * user icon
// * createPost
// * user profile picture