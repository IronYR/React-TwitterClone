import React from 'react'
import classes from './Post.module.css';
import { Link } from 'react-router-dom';
import Likes from '../Likes/Likes';
export default function Post(props) {
    return (
            <div className={classes.post}>
                <div className={classes.img}>
                    <Link to={"/"+props.username} >
                        <img src={props.userImg} alt=""/>
                    </Link>
                </div>
                <div className={classes.main}>
                    <Link to={"/" + props.username} className={classes.mainLink}>
                        <div className={classes.top}>
                            <div className={classes.poster}>
                                <span className={classes.name}>{props.name}</span>
                                <span className={classes.username}>@{props.username}</span>
                                <span className={classes.time}>{props.time}</span>
                            </div>
                        </div>
                    </Link>
                    <div className={classes.content}>
                        {props.isComment === "true" 
                        ? 
                        (<div className={classes.contentLink}>
                            <div className={classes.postDesc}>{props.desc}</div>
                        </div>) 
                        : 
                        (<Link to={"/" + props.username + "/"+ props.postID} className={classes.contentLink}>
                            <div className={classes.postDesc}>{props.desc}</div>
                        </Link>)
                        }
                            
                        <div className={classes.interaction}>
                            {props.hasLikes ? <><Likes postID={props.postID} liked={props.liked} isLiked={props.isLiked}/>
                            <span>{props.likes}</span></> : null}
                        </div>
                    </div>
                    </div>

            </div>
    )
}





