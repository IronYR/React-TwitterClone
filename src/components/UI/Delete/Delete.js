import React from 'react'
import classes from './Delete.module.css'
export default function Delete(props) {
    function deletePost(){
        fetch("https://my-rest-api-twitter.herokuapp.com/delete/" + props.postID, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }).then(res=>{
            props.deleted();
            props.liked()
            return res.json()
        }).then(result=>{
        })
        .catch(err=>{
            console.log(err)
        });
    }
    return (
        <div>
        <button className={classes.btn} onClick={deletePost}>Delete Post</button>
            
        </div>
    )
}
