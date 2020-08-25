import React from 'react'
import classes from './Likes.module.css';
export default function Likes(props) {
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
            props.liked();

            if(post.isLikedBy.includes(user._id)){
                let newPost = post.isLikedBy.filter(id=> id.toString() !== user._id.toString());
                post.isLikedBy = newPost;
                post.likes--;
                if(user.likedPosts.length>0){
                    let ind = user.likedPosts.findIndex(id=> id===post._id.toString());
                    let newLikedPosts = user.likedPosts.splice(ind, 1);
                    user.likedPosts = newLikedPosts;
                }
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
                }).catch(err=>{
                    console.log(err)
                })
                                
            } else{
                 post.isLikedBy.push(user._id);
                 post.likes++;
                 user.likedPosts.push(post._id);
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
                    props.liked();
                })
             }

        }).catch(err=>{
            console.log(err)
        })

    }
    return (
        <button className={classes.btn} style={props.isLiked ? {backgroundColor: "blue"} : null} onClick={onLike}>{props.isLiked ? "Unlike" : "Like"}</button>
    )
}
