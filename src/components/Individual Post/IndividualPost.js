import React, {useEffect, useState} from 'react';
import Left from '../UI/LeftSideBar/LeftBar';
import Right from '../UI/RightSideBar/RightBar'
import classes from './IndividualPost.module.css';
import Header from '../UI/Header/Header';
import { Link } from 'react-router-dom';
export default function IndividualPost(props) {
    let [post, setPost] = useState({});
    let [user, setUser] = useState({})
    console.log(props);
    useEffect(()=>{
        fetch("http://localhost:5000/" +props.match.params.username + "/"+props.match.params.id, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            // 'Authorization': "Bearer " + token
        },
    }).then(result=>{
        return result.json()
    }).then(post=>{
        console.log(post);
        setPost(post);
        setUser(post.userID)
    })
    // return ()=> 
    }, []);
    console.log(post);
    console.log(user)
    return (
        <div className={classes.home} style={{background:"black",  maxWidth: "100%"}}>
            <Left/>
            <div className={classes.Main}>
                <Header showBackButton={true} title="Tweet" goBack={props.history.goBack}/>
                <div className={classes.postContent}>
                    <div className={classes.post}>
                        <Link to={"/"+ user.username}>
                        <div className={classes.posterInfo}>
                            <div className={classes.posterImg}>
                                <img src={user.picture} alt="Pic"></img>
                            </div>
                            <div className={classes.poster}>
    <p className={classes.posterName}>{user.name}</p>
    <p className={classes.posterUsername}>@{user.username}</p>
                            </div>
                        </div>
                        </Link>
                        <div className={classes.postContent}>{post.postDesc}</div>
                        <div className={classes.postMetaInfo}>
                            {post.createdAt}
                        </div>
                        <div className={classes.postInteractionsCount}>
                        <span>{post.likes}</span>
                            <p>Likes</p>
    <span>{post.retweet}</span>
                            <p>Retweets</p>

                        </div>
                        <div className={classes.postInteractions}>
                            <button>Like</button>
                            <button>Retweet</button>
                        </div>

                    </div>
                    <div className={classes.postComments}></div>
                </div>
            </div>
            
            <Right/>
            
        </div>
    )
}
