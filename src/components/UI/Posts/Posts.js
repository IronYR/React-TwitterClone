import React, { useEffect, useState } from "react";
import Post from "../Post/Post";
import CreatePost from "../Create Post/CreatePost";
import Header from "../Header/Header";
import Loader from "../Loader/Loader";
import classes from "./Posts.module.css";
export default function Posts(props) {
  let [loading, setLoading] = useState(false);
  let [userPic, setUserPic] = useState("");
  let [postCreated, setPostCreated] = useState(false);
  let [isLiked, setIsLiked] = useState(false);
  let [posts, setPosts] = useState([]);
  let locToken = localStorage.getItem("token");
  let [token, setToken] = useState(locToken);
  let userID = localStorage.getItem("userID");
  let url = "https://my-rest-api-twitter.herokuapp.com";
  url = "https://rest-api-twitter.onrender.com";

  useEffect(() => {
    setLoading(true);
    fetch(url + "/?userID=" + userID, {
      method: "GET",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((result) => {
        return result.json();
      })
      .then((data) => {
        setPosts(data.post);
        setUserPic(data.userPic);
        setLoading(false);
      });
    return () => setPostCreated(false);
  }, [postCreated, isLiked, userID, token]);
  function created() {
    setPostCreated(true);
  }
  let center = {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };
  return (
    <div className={classes.container}>
      <Header title="Home" showBackButton={false} logout={props.logout} />
      <CreatePost done={created} userPic={userPic} type=""></CreatePost>
      {loading && (
        <div style={center}>
          <Loader color="white" />
        </div>
      )}
      {posts.map((post) => {
        let time = new Date(post.timePostCreated).toLocaleDateString();
        // let time = new Date(current - postCreated).getMinutes();
        let isLiked;
        if (post.isLikedBy.includes(userID)) {
          isLiked = true;
        } else {
          isLiked = false;
        }

        return (
          <Post
            key={Math.random()}
            name={post.posterName}
            username={post.username}
            time={time}
            desc={post.postDesc}
            likes={post.likes}
            isComment="false"
            postID={post.postID}
            liked={created}
            isLiked={isLiked}
            userImg={post.userImg}
            userID={post.userID}
            hasLikes={true}
          ></Post>
        );
      })}
    </div>
  );
}
