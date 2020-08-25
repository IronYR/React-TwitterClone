import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom"
import Right from '../UI/RightSideBar/RightBar';
import Left from '../UI/LeftSideBar/LeftBar';
import classes from './User.module.css';
import Post from '../UI/Post/Post'
import Header from '../UI/Header/Header'
export default function User(props) {
    let [user, setUser] = useState({});
    let [follower, setFollower] = useState({});
    let [posts, setPosts] = useState([]);
    let [isFollowing, setIsFollowing] = useState([]);
    let [click, setClick] = useState(false);
    useEffect(()=>{
        fetch(`http://localhost:5000/follow/${props.match.params.username}/${localStorage.getItem("userID")}`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
    }).then(result=>{
        return result.json()
    }).then(({user, follower})=>{
        setUser(user[0]);
        setPosts(user[0].posts)
        setFollower(follower);
        setIsFollowing(follower.isFollowing);
    })
    return ()=> setClick(false)
    }, [click, props.match.params.username]);
    function onFollow(){
        if(user.areFollowers.includes(follower._id) === "true" || user.areFollowers.includes(follower._id)){
            let newFollowers = user.areFollowers.filter(id=> id !== follower._id);
            user.areFollowers = newFollowers;
            user.followers--;
            let newIsFollowing = follower.isFollowing.filter(id=> id !== user._id);
            follower.isFollowing = newIsFollowing;
            follower.following--;
            setClick(true)
            setIsFollowing(follower.isFollowing)


            fetch(`http://localhost:5000/follow/${props.match.params.username}/${localStorage.getItem("userID")}`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({
                    newUser: user,
                    newFollower: follower
                })
            }).then(res=>{
                return res.json()
            }).then(result=>{
            })
        } else if(!user.areFollowers.includes(follower._id)){
            user.areFollowers.push(follower._id);
            follower.isFollowing.push(user._id);
            user.followers++;
            follower.following++;
            setClick(true)
            setIsFollowing(follower.isFollowing)

            fetch(`http://localhost:5000/follow/${props.match.params.username}/${localStorage.getItem("userID")}`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({
                    newUser: user,
                    newFollower: follower
                })
            }).then(res=>{
                return res.json()
            }).then(result=>{
            })
        }
    }
    function logout(){
        localStorage.setItem("isAuth", "false");
        localStorage.removeItem("token");
        localStorage.removeItem("userID");
        localStorage.removeItem("expiryDate");
        localStorage.removeItem("user")
        window.location.reload()
        props.history.replace("/")
      }
    let time = new Date(user.createdAt).toLocaleDateString();
    let currentUser = JSON.parse(localStorage.getItem("user"));
    return ( 
        <div className={classes.home}>
            <Left logout={logout}/>
            <div className={classes.Main}>
                <Header title={user.name} showBackButton={true} goBack={props.history.goBack} logout={props.logout}/>
                <div className={classes.user}>
                    <div className={classes.userImg}>
                        <img src={user.picture} alt=""/>
                        {currentUser.username === user.username 
                        ? 
                        <Link className={classes.editProfile} to={"/edit/"+ user._id}>Edit Profile</Link> 
                        : 
                        <button className={classes.editProfile} style={isFollowing.includes(user._id) ? {backgroundColor: "blue"} : null} onClick={onFollow}>
                            <span>{isFollowing.includes(user._id) ? "Following" : "Follow"}</span>
                        </button>
                        }
                    </div>
                    <div className={classes.userInfo}>
                        <p className={classes.userName}>{user.name}</p>
                        <p className={classes.userUsername}>@{user.username}</p>
                        <p className={classes.userDesc}>{user.desc}</p>
                        <div className={classes.userLocDate}>
                            <p className={classes.userDate}>Joined {time}</p>
                        </div>
                        <div className={classes.userInteractions}>
                            <div className={classes.interaction}>
                                <span className={classes.userFollowing}>{user.following}</span>
                                <span style={{color: "#6E767D"}}>Following</span>
                            </div>
                            <div className={classes.interaction}>
                                <span className={classes.userFollowers}>{user.followers}</span>
                                <span style={{color: "#6E767D"}}>Followers</span>
                            </div>
                        </div>
                        <p className={classes.postsTitle}>Posts</p>
                    </div>
                    <div className={classes.userPosts}>
                        {posts.map(post=>{
                            let time = new Date(post.createdAt).toLocaleDateString();
                            return <Post key={Math.random()} name={user.name} username={user.username} hasLikes={false} userImg={user.picture} postID={post._id} userID={user._id} desc={post.postDesc} time={time}/> 
                        })}
                    </div>
                </div>
            </div>
            <Right/>
        </div>
    )
}
