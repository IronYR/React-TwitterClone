import React, {useEffect, useState} from 'react';
import Left from '../UI/LeftSideBar/LeftBar';
import Right from '../UI/RightSideBar/RightBar'
import classes from './IndividualPost.module.css';
import Header from '../UI/Header/Header';
import CreatePost from '../UI/Create Post/CreatePost'
import Post from '../UI/Post/Post'
import { Link } from 'react-router-dom';
export default function IndividualPost(props) {
    let [post, setPost] = useState({});
    let [comments, setComments] = useState([]);
    let [user, setUser] = useState({});
    let [commented, setCommented] = useState(false)
    console.log(props);
    function logout(){
        // setIsAuth(false);
        localStorage.setItem("isAuth", "false");

        localStorage.removeItem("token");
        localStorage.removeItem("userID");
        localStorage.removeItem("expiryDate");
        localStorage.removeItem("user")
        window.location.reload()

        props.history.replace("/")
      }
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
    }).then(({post, comments})=>{
        console.log(post);
        setPost(post);
        setUser(post.userID)
        setComments(comments)
    })
    return ()=> setCommented(false)
    }, [commented]);
    function isCommented(){
        setCommented(true)
    }
    console.log(post);
    console.log(user);
    function onLike(){
        let currentUser = localStorage.getItem("userID");
        fetch(`http://localhost:5000/likes?postID=${post._id}&userID=${currentUser}`, {
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
        <div className={classes.home} style={{background:"black",  maxWidth: "100%"}}>
            <Left logout={logout}/>
            <div className={classes.Main}>
                <Header className={classes.sticky} showBackButton={true} title="Tweet" goBack={props.history.goBack}/>
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
                        <div className={classes.postDesc}>{post.postDesc}</div>
                        <div className={classes.postMetaInfo}>
                            {post.createdAt}
                        </div>
                        <div className={classes.postInteractionsCount}>
                            <span>{post.likes}</span>
                            <p>Likes</p>
                        </div>
                        <div className={classes.postInteractions}>
                            <button onClick={onLike}>Like</button>
                            <button>Retweet</button>
                        </div>

                    </div>
                    <div className={classes.postComments}>
                        <CreatePost done={isCommented} userPic={JSON.parse(localStorage.getItem("user")).picture} type="comments" postID={post._id} userID={localStorage.getItem("userID")} reload="true" />
                        {comments.map(comment=>{
                            let time = new Date(comment.createdAt).toLocaleString();
                            let userStorage = JSON.parse(localStorage.getItem("user"));
                            // return <Post key={Math.random()} name={} username={} time={time} desc={} likes={} retweets={} postID={} liked={created} userImg={} userID={}></Post>
                            return <Post key={Math.random()} name={comment.userID.name} username={comment.userID.username} time={time} desc={comment.comment} hasLikes={false} postID={post._id} commentID={comment._id} userImg={comment.userID.picture} userID={localStorage.getItem("userID")} isComment="true"/>
                        })}
                        
                    </div>
                </div>
            </div>
            
            <Right/>
            
        </div>
    )
}
