import React, { useState } from 'react'
import classes from './Likes.module.css';
export default function Likes(props) {
    let currentUser = localStorage.getItem("userID");
    // let [btnTitle, setBtnTitle] = useState("Like");
    let [isLiked, setIsLiked] = useState(false);
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
            props.liked();

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
                    // window.location.reload()

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
            // window.location.reload()
        }).catch(err=>{
            console.log(err)
        })

    }
    // if(props.isLiked){
    //     setBtnTitle("Unlike");
    // } else{
    //     setBtnTitle("Like")
    // }
    console.log(props.isLiked)
    return (
        <button className={classes.btn} style={props.isLiked ? {backgroundColor: "blue"} : null} onClick={onLike}>{props.isLiked ? "Unlike" : "Like"}</button>
    )
}
