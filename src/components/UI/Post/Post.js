import React, {useState} from 'react'
import classes from './Post.module.css';
import Like from '../../../images/iconfinder_jee-04_2239656.svg';
import Retweet from '../../../images/retweet.svg'
import { Link } from 'react-router-dom';
export default function Post(props) {
    let currentUser = localStorage.getItem("userID");
    function onLike(){
        fetch(`http://localhost:5000/likes?postID=${props.postID}&userID=${currentUser}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }).then(res=>{

            return res.json()
        }).then(result=>{
            let {post, user} = result;
            console.log(result)
            if(post.isLikedBy.includes(user._id)){
                let index = post.isLikedBy.findIndex(id=> id.toString()==user._id.toString());
                let newPost = post.isLikedBy.filter(id=> id.toString() != user._id.toString());
                // let updatedPost = {...post};
                // updatedPost.isLikedBy = newIsLikedBy;
                console.log(newPost)
                console.log(index);
                console.log(post);
                console.log("new post", newPost)
                // delete post.isLikedBy[index];
                // let newIsLikedBy = post.isLikedBy.splice(index,1);
                post.isLikedBy = newPost;
                post.likes--;
                console.log("post after likes dedeucted", post)
                if(user.likedPosts.length>0){
                    let ind = user.likedPosts.findIndex(id=> id==post._id.toString());
                    let newLikedPosts = user.likedPosts.splice(ind, 1);
                    user.likedPosts = newLikedPosts;
                }
                // console.log("user index", ind)
                // delete user.likedPosts[ind]
                console.log( "user after deleting",user)
                fetch("http://localhost:5000/likes", {
                    method: "POST",
                    headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                    },
                    body: JSON.stringify({
                        newUser: user,
                        newPost: post
                    })
                }).then(res=>{
                    return res.json()
                }).then(result=>{
                    console.log(result);
                    window.location.reload()
                })
                                
            } else{
                 post.isLikedBy.push(user._id);
                 post.likes++;
                 user.likedPosts.push(post._id);
                 console.log(user, post)
                 fetch("http://localhost:5000/likes", {
                    method: "POST",
                    headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                    },
                    body: JSON.stringify({
                        newUser: user,
                        newPost: post
                    })
                }).then(res=>{
                    return res.json()
                }).then(result=>{
                    console.log(result);
                    props.liked();
                })
             }

            console.log(result)
            window.location.reload()
        }).catch(err=>{
            console.log(err)
        })

    }
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
                        {/* /yrehan/postID/comments/commentID */}
                        {props.isComment == "true" 
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
                            {props.hasLikes ? <><button onClick={onLike}>Like</button>
                            <span>{props.likes}</span></> : null}
                            
                        </div>
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

//keep





// <svg style={{enableBackground: "new 0 0 48 48"}} version="1.1" viewBox="0 0 48 48" xmlSpace="preserve" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"><g className={classes.st0} id="Padding__x26__Artboard"/><g id="Icons"><g><path className={classes.st1} d="M35.22158,26.12098h3.05859c0.58096,0,0.93979,0.63222,0.65785,1.13629l-3.71644,6.44183l-0.35028,0.60659    l-0.67494,1.17901c-0.29902,0.51262-1.02522,0.51262-1.30716,0l-0.58096-1.01668l-0.50407-0.87144l-3.66518-6.33931    c-0.29902-0.50407,0.06835-1.13629,0.64931-1.13629h3.01587"/><path className={classes.st1} d="M19.59021,12.10061h10.39485c2.89881,0,5.23574,2.3497,5.23574,5.23574v8.74276"/><path className={classes.st1} d="M21.51849,15.51022h8.46657c1.00884,0,1.81335,0.83006,1.81335,1.82612l0.00575,8.78464"/><line className={classes.st1} x1="21.51849" x2="19.59021" y1="15.51022" y2="12.10061"/><path className={classes.st1} d="M12.77842,21.84879H9.71983c-0.58096,0-0.93979-0.63222-0.65785-1.13629l3.71644-6.44183l0.35029-0.60659    l0.67494-1.17901c0.29902-0.51261,1.02522-0.51261,1.30716,0l0.58096,1.01668l0.50407,0.87144l3.66518,6.33931    c0.29902,0.50407-0.06835,1.13629-0.64931,1.13629h-3.01587"/><path className={classes.st1} d="M12.77842,21.84879H9.71983c-0.58096,0-0.93979-0.63222-0.65785-1.13629l3.71644-6.44183l0.35029-0.60659    l0.67494-1.17901c0.29902-0.51261,1.02522-0.51261,1.30716,0l0.58096,1.01668l0.50407,0.87144l3.66518,6.33931    c0.29902,0.50407-0.06835,1.13629-0.64931,1.13629h-3.01587"/><path className={classes.st1} d="M28.40979,35.89939H18.01494c-2.89881,0-5.23574-2.3497-5.23574-5.23574V21.8523"/><path className={classes.st1} d="M26.48151,32.48978h-8.46657c-1.00884,0-1.81335-0.83006-1.81335-1.82612V21.8523"/><line className={classes.st1} x1="26.48151" x2="28.40979" y1="32.45955" y2="35.86916"/></g></g></svg>


//





