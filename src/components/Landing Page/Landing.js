import React from 'react'
import classes from './Landing.module.css'
import Twitter from '../../images/twitter-logo.png'
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
                        <img src={Twitter} alt=""></img>
                    </div>
                    <div className={classes.text}>
                        See what's happening in<br></br> the world right now.
                    </div>
                    <div className={classes.join}>
                        Join Twitter Today
                    </div>
                    <div className={classes.buttons}>
                        <button>Sign up</button>
                        <button className={classes.login}>Log in</button>
                    </div>
                </div>
                
            </div>
        </div>
    )
}
