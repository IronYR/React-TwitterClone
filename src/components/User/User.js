import React, {useEffect, useState} from 'react';
import Right from '../UI/RightSideBar/RightBar';
import Left from '../UI/LeftSideBar/LeftBar';
import classes from './User.module.css';
import Post from '../UI/Post/Post'
import Header from '../UI/Header/Header'
export default function User(props) {
    let [user, setUser] = useState({});
    let [posts, setPosts] = useState([]);
    console.log(props)
    useEffect(()=>{
        fetch("http://localhost:5000/" +props.match.params.username, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            // 'Authorization': "Bearer " + token
        },
    }).then(result=>{
        return result.json()
    }).then(user=>{
        console.log(user);
        setUser(user[0]);
        setPosts(user[0].posts)
    })
    // return ()=> 
    }, []);
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
    let time = new Date(user.createdAt).toLocaleDateString();
    
    return ( 
        <div className={classes.home}>
            <Left logout={logout}/>
            <div className={classes.Main}>
                <Header title={user.name} showBackButton={true} goBack={props.history.goBack} />
                <div className={classes.user}>
                    <div className={classes.userImg}>
                        <img src={user.picture} alt=""/>
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
                            let time = new Date(post.createdAt).toLocaleString();
                            return <Post name={user.name} username={user.username} hasLikes={false} userImg={user.picture} postID={post._id} userID={user._id} desc={post.postDesc}/> 
                        })}
                    </div>
                </div>
            </div>
            <Right/>
        </div>
    )
}
