import React, {useEffect, useState} from 'react'
import Post from '../Post/Post';
import CreatePost from '../Create Post/CreatePost';
import Header from '../Header/Header'
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
        setPosts(data.post);
        setUserPic(data.userPic);
    })
    return ()=> setPostCreated(false)
    }, [postCreated,isLiked, userID, token]);
    function created(){
        setPostCreated(true)
        
    }
    return (
        <div style={{background:"black", border: "1px solid rgb(61, 59, 59)", maxWidth: "100%"}}>
            <Header title="Home" showBackButton={false} logout={props.logout}/>
            <CreatePost done={created} userPic={userPic} type=""></CreatePost>
            {posts.map(post=>{
                let time = new Date(post.timePostCreated).toLocaleDateString();
                // let time = new Date(current - postCreated).getMinutes();
                let isLiked;
                if(post.isLikedBy.includes(userID)){
                    isLiked = true;
                } else{
                    isLiked= false;
                }
                
                return <Post key={Math.random()} name={post.posterName} username={post.username} time={time} desc={post.postDesc} likes={post.likes} isComment="false" postID={post.postID} liked={created} isLiked={isLiked} userImg={post.userImg} userID={post.userID} hasLikes={true}></Post>
            })}
        </div>
    )
}
