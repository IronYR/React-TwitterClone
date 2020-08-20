import React, {useEffect, useState} from 'react'
import Post from '../Post/Post';
import CreatePost from '../Create Post/CreatePost';
import Header from '../Header/Header'
// import moment from 'moment';
export default function Posts(props) {
    let [posts, setPosts] = useState([]);
    let locToken = localStorage.getItem("token");
    let [token, setToken] = useState(locToken)
    useEffect(()=>{
        fetch("http://localhost:5000", {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': "Bearer " + token
        },
    }).then(result=>{
        return result.json()
    }).then(post=>{
        console.log(post);
        setPosts(post);
    })
    }, []);
    // function dateHandler(date){
    //     let current = new Date();
    //     let before = new Date(date);
    //     return new Date(current - before).getMinutes;
    // }
    return (
        <div style={{background:"black", border: "1px solid grey", maxWidth: "100%"}}>
            <Header title="Home" showBackButton={false}/>
            <CreatePost user={props.user}></CreatePost>
            {posts.map(post=>{
                let time = new Date(post.timePostCreated).toLocaleString();
                // let time = new Date(current - postCreated).getMinutes();
                
                return <Post key={Math.random()} name={post.posterName} username={post.username} time={time} desc={post.postDesc} likes={post.likes} retweets={post.retweets} postID={post.postID} isLiked={post.isLiked}></Post>
            })}
        </div>
    )
}
