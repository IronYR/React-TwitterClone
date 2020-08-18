import React, {useEffect, useState} from 'react'
import Post from '../Post/Post';
import CreatePost from '../Create Post/CreatePost';
import Header from '../Header/Header'
export default function Posts() {
    let [posts, setPosts] = useState([]);
    useEffect(()=>{
        fetch("http://localhost:5000", {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
    }).then(result=>{
        return result.json();
    }).then(post=>{
        console.log(post);
        setPosts(post);
    })
    }, [])
    return (
        <div style={{background:"black", border: "1px solid grey"}}>
            <Header title="Home" showBackButton={false}/>

            <CreatePost></CreatePost>
            {posts.map(post=>(
                <Post key={Math.random()} name={post.posterName} username={post.username} time={post.timePostCreated} desc={post.postDesc} likes={post.likes} retweets={post.retweets}></Post>
            ))}
        </div>
    )
}
