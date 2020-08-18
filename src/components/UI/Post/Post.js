import React from 'react'
import classes from './Post.module.css'
export default function Post(props) {

    return (
        <div className={classes.post}>
            <div className={classes.img}>
                <img src="https://th.bing.com/th/id/OIP.HTvPkLCDOlAYQX-sh8oGogAAAA?w=146&h=150&c=7&o=5&dpr=1.25&pid=1.7"/>
            </div>
            <div className={classes.main}>
                <div className={classes.top}>
                    <div className={classes.poster}>
                    <span className={classes.name}>{props.name}</span>
                    <span className={classes.username}>@{props.username}</span>
                    <span className={classes.time}>{props.time}</span>
                    </div>
                    <div className={classes.options}>
                        <span>V</span>
                    </div>
                </div>
                <div className={classes.content}>
                    <div className={classes.postDesc}>{props.desc}</div>
                    <div className={classes.interaction}>
                        <span>Likes:{props.likes}</span>
                    <span>Retweets:{props.retweets}</span></div>
                </div>
                </div>
            
        </div>
    )
}

// * picture of poster
// * name
// * username
// * time since posted
// * desc
// * comments: each createComment will be the same as createPost
// * likes
// * retweet