import React from 'react';
import {Link} from "react-router-dom"
import classes from './Landing.module.css'
export default function Landing() {
    return (
        <div className={classes.landing}>
            <div className={classes.left}>
                <div className={classes.leftContainer}>
                    <p>Follow your interests</p>
                    <p>Hear what people are talking about</p>
                    <p>Join the conversation</p>
                </div>
                
            </div>
            <div className={classes.right}>
                <div className={classes.rightContainer}>
                    <div className={classes.logo}>
                    </div>
                    <div className={classes.text}>
                        See what's happening in the world right now.
                    </div>
                    <div className={classes.join}>
                        Join Today
                    </div>
                    <div className={classes.buttons}>
                        <Link to="/signup" className={classes.signup}>Sign up</Link>
                        <Link to="/login" className={classes.login}>Log in</Link>
                    </div>
                </div>
                
            </div>
        </div>
    )
}
