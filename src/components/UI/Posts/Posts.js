import React, {useEffect, useState} from 'react'
import Post from '../Post/Post';
import CreatePost from '../Create Post/CreatePost';
import Header from '../Header/Header'
// import moment from 'moment';
export default function Posts(props) {
    let [userPic, setUserPic] = useState("");
    let [postCreated, setPostCreated] = useState(false)
    let [isLiked, setIsLiked] = useState(false)
    let [posts, setPosts] = useState([]);
    let locToken = localStorage.getItem("token");
    let [token, setToken] = useState(locToken)
    let userID = localStorage.getItem("userID");
    useEffect(()=>{
        fetch("http://localhost:5000/?userID="+userID, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': "Bearer " + token
        },
    }).then(result=>{
        return result.json()
    }).then(data=>{
        console.log(data.post);
        setPosts(data.post);
        setUserPic(data.userPic);
    })
    return ()=> setPostCreated(false)
    }, [postCreated]);
    // useEffect(()=>{
    //     fetch("http://localhost:5000", {
    //     method: "GET",
    //     headers: {
    //         'Content-Type': 'application/json',
    //         'Accept': 'application/json',
    //         'Authorization': "Bearer " + token
    //     },
    // }).then(result=>{
    //     return result.json()
    // }).then(post=>{
    //     console.log(post);
    //     setPosts(post);
    // })
    // return ()=> setIsLiked(false)
    // }, [isLiked]);
    // function dateHandler(date){
    //     let current = new Date();
    //     let before = new Date(date);
    //     return new Date(current - before).getMinutes;
    // }
    function created(){
        console.log(postCreated)
        setPostCreated(true)
        
    }
    // function liked(){
    //     console.log(isLiked)
    //     setIsLiked(true)
    // }
    return (
        <div style={{background:"black", border: "1px solid rgb(61, 59, 59)", maxWidth: "100%"}}>
            <Header title="Home" showBackButton={false}/>
            <CreatePost done={created} userPic={userPic} type=""></CreatePost>
            {posts.map(post=>{
                let time = new Date(post.timePostCreated).toLocaleString();
                // let time = new Date(current - postCreated).getMinutes();
                
                return <Post key={Math.random()} name={post.posterName} username={post.username} time={time} desc={post.postDesc} likes={post.likes} isComment="false" postID={post.postID} liked={created} userImg={post.userImg} userID={post.userID} hasLikes={true}></Post>
            })}
        </div>
    )
}
