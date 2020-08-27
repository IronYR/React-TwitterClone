import React, {useEffect, useState} from 'react';
import Left from '../UI/LeftSideBar/LeftBar';
import Right from '../UI/RightSideBar/RightBar'
import classes from './IndividualPost.module.css';
import Header from '../UI/Header/Header';
import CreatePost from '../UI/Create Post/CreatePost'
import Post from '../UI/Post/Post'
import { Link } from 'react-router-dom';
import Likes from '../UI/Likes/Likes';
import Loader from '../UI/Loader/Loader'
import Delete from '../UI/Delete/Delete';
export default function IndividualPost(props) {
    let [loading, setLoading] = useState(false);
    let [post, setPost] = useState({});
    let [comments, setComments] = useState([]);
    let [user, setUser] = useState({});
    let [likedBy, setLikedBy]= useState([]);
    let [commented, setCommented] = useState(false)
    useEffect(()=>{
        let isMounted = true;
        setLoading(true)
        fetch("https://my-rest-api-twitter.herokuapp.com/" +props.match.params.username + "/"+props.match.params.id, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
    }).then(result=>{
        return result.json()
    }).then(({post, comments})=>{
        if(isMounted){
            setPost(post);
            setUser(post.userID);
            setLikedBy(post.isLikedBy);
            setComments(comments);
            setLoading(false)
        }
        
    })
    return ()=> {
        setCommented(false)
        isMounted = false
    }
    }, [commented, props.match.params.username, props.match.params.id]);
    let userID = localStorage.getItem("userID");
    function isCommented(){
        setCommented(true)
    }
    // function isDeleted(){
    //     props.history.goBack();
    // }
    return (
        <>
        {loading ? <div className={classes.center}><Loader color="white"/></div> : (
        <div className={classes.home} style={{background:"black",  maxWidth: "100%"}}>
            <Left logout={props.logout}/>
            <div className={classes.Main}>
                <Header className={classes.sticky} showBackButton={true} title="Tweet" goBack={props.history.goBack} logout={props.logout}/>
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
                            <Likes liked={isCommented} postID={post._id} isLiked={likedBy.includes(userID) ? true : false}/>
                            <Delete postID={post._id} deleted={props.deleted} liked={isCommented}/>
                        </div>

                    </div>
                    <div className={classes.postComments}>
                        <CreatePost done={isCommented} userPic={JSON.parse(localStorage.getItem("user")).picture} type="comments" postID={post._id} userID={localStorage.getItem("userID")} reload="true" />
                        {comments.map(comment=>{
                            let time = new Date(comment.createdAt).toLocaleString();
                            // return <Post key={Math.random()} name={} username={} time={time} desc={} likes={} retweets={} postID={} liked={created} userImg={} userID={}></Post>
                            return <Post key={Math.random()} name={comment.userID.name} username={comment.userID.username} time={time} desc={comment.comment} hasLikes={false} postID={post._id} commentID={comment._id} userImg={comment.userID.picture} userID={localStorage.getItem("userID")} isComment="true"/>
                        })}
                        
                    </div>
                </div>
            </div>
            
            <Right/>
            
        </div>
        )}
        </>
    )
}
