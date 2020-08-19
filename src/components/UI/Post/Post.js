import React, {useState} from 'react'
import classes from './Post.module.css';
import Like from '../../../images/iconfinder_jee-04_2239656.svg';
import Retweet from '../../../images/retweet.svg'
export default function Post(props) {
    let originalLike = props.likes;
    let [liked, setLiked] = useState(props.isLiked)
    let [likes, setLikes] = useState(props.likes);
    function onClick(){
        if(likes == props.likes){
            if(props.isLiked){
            setLikes(likes--)
            setLiked(false)
            likesHandle()
            return ;
            }
            setLikes(likes++);
            setLiked(true);
            likesHandle()
        } else if(likes == originalLike++){
            setLikes(likes--)
            setLiked(false)
            likesHandle()
        }
    }
    function onRetweet(){
        
    }
    function likesHandle(){
        if(!liked){
            fetch("http://localhost:5000/likes", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    likes: likes,
                    postID: props.postID,
                    isLiked: true
                })
            }).then(res=>{
                return res.json()
            }).then(result=>{
                console.log(result)
                window.location.reload()
            }).catch(err=>{
                console.log(err)
            })
        }
        if(liked){
            fetch("http://localhost:5000/likes", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    likes: likes,
                    postID: props.postID,
                    isLiked: false
                })
            }).then(res=>{
                return res.json()
            }).then(result=>{
                console.log(result)
                window.location.reload()

            }).catch(err=>{
                console.log(err)
            })
        }
        
    }
    return (
        <div className={classes.post}>
            <div className={classes.img}>
                <img src="https://th.bing.com/th/id/OIP.HTvPkLCDOlAYQX-sh8oGogAAAA?w=146&h=150&c=7&o=5&dpr=1.25&pid=1.7" alt=""/>
            </div>
            <div className={classes.main}>
                <div className={classes.top}>
                    <div className={classes.poster}>
                    <span className={classes.name}>{props.name}</span>
                    <span className={classes.username}>@{props.username}</span>
                    <span className={classes.time}>{props.time}</span>
                    </div>
                    <div className={classes.options}>
                        <span>V</span>
                    </div>
                </div>
                <div className={classes.content}>
                    <div className={classes.postDesc}>{props.desc}</div>
                    <div className={classes.interaction}>
                        {/* <span onClick={onClick}><img className={classes.interactionIcons} src={Like} alt="" id={classes.like}/></span> */}
                        <button onClick={onClick}>Like</button>
                        <span>{likes}</span>
                        <button onClick={onRetweet}>Retweet</button>
                        <span>{props.retweets}</span>
                    </div>
                </div>
                </div>
            
        </div>
    )
}

// * picture of poster
// * name
// * username
// * time since posted
// * desc
// * comments: each createComment will be the same as createPost
// * likes
// * retweet







// <svg style={{enableBackground: "new 0 0 48 48"}} version="1.1" viewBox="0 0 48 48" xmlSpace="preserve" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"><g className={classes.st0} id="Padding__x26__Artboard"/><g id="Icons"><g><path className={classes.st1} d="M35.22158,26.12098h3.05859c0.58096,0,0.93979,0.63222,0.65785,1.13629l-3.71644,6.44183l-0.35028,0.60659    l-0.67494,1.17901c-0.29902,0.51262-1.02522,0.51262-1.30716,0l-0.58096-1.01668l-0.50407-0.87144l-3.66518-6.33931    c-0.29902-0.50407,0.06835-1.13629,0.64931-1.13629h3.01587"/><path className={classes.st1} d="M19.59021,12.10061h10.39485c2.89881,0,5.23574,2.3497,5.23574,5.23574v8.74276"/><path className={classes.st1} d="M21.51849,15.51022h8.46657c1.00884,0,1.81335,0.83006,1.81335,1.82612l0.00575,8.78464"/><line className={classes.st1} x1="21.51849" x2="19.59021" y1="15.51022" y2="12.10061"/><path className={classes.st1} d="M12.77842,21.84879H9.71983c-0.58096,0-0.93979-0.63222-0.65785-1.13629l3.71644-6.44183l0.35029-0.60659    l0.67494-1.17901c0.29902-0.51261,1.02522-0.51261,1.30716,0l0.58096,1.01668l0.50407,0.87144l3.66518,6.33931    c0.29902,0.50407-0.06835,1.13629-0.64931,1.13629h-3.01587"/><path className={classes.st1} d="M12.77842,21.84879H9.71983c-0.58096,0-0.93979-0.63222-0.65785-1.13629l3.71644-6.44183l0.35029-0.60659    l0.67494-1.17901c0.29902-0.51261,1.02522-0.51261,1.30716,0l0.58096,1.01668l0.50407,0.87144l3.66518,6.33931    c0.29902,0.50407-0.06835,1.13629-0.64931,1.13629h-3.01587"/><path className={classes.st1} d="M28.40979,35.89939H18.01494c-2.89881,0-5.23574-2.3497-5.23574-5.23574V21.8523"/><path className={classes.st1} d="M26.48151,32.48978h-8.46657c-1.00884,0-1.81335-0.83006-1.81335-1.82612V21.8523"/><line className={classes.st1} x1="26.48151" x2="28.40979" y1="32.45955" y2="35.86916"/></g></g></svg>


//





