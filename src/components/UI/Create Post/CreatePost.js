import React, {useState} from 'react'
import classes from './CreatePost.module.css'
export default function CreatePost(props) {
    let [postCreated, setPostCreated] = useState(false)
    let token = localStorage.getItem("token");
    let [postDesc, setPostDesc] = useState({desc: "Whats happening?"});
    const tx = document.getElementsByTagName('textarea');
    for (let i = 0; i < tx.length; i++) {
    tx[i].setAttribute('style', 'height:' + (tx[i].scrollHeight) + 'px;overflow-y:hidden;');
    tx[i].addEventListener("input", OnInput, false);
    }

    function OnInput() {
      this.style.height = 'auto';
      this.style.height = (this.scrollHeight) + 'px';
    }
    let uri = props.type;
    function onFormSend(e){
        // let postPayload = {
        //     postContent: postDesc.desc,
        // };
        // let commentPayload = {
        //     postContent: postDesc.desc,
        //     postID: postID
        // }
        props.done();

        fetch("http://localhost:5000/"+uri, {
            method: "POST",
            headers: {
                //@todo: fill this up and send the data
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                "Authorization": 'Bearer ' + token
            },
            body: JSON.stringify({
                postContent: postDesc.desc,
                postID: props.postID,
                userID: props.userID
            })
        }).then(res=>{
            return res.json()
        }).then(result=>{
            console.log(result)
            if(props.reload == "true"){
            window.location.reload()

            }
        }).catch(err=>{
            console.log(err)
        })
    }
    function updateData(e){
        
        setPostDesc({desc: e.target.value})
    }
    return (
        <div className={classes.createPost}>
            <div className={classes.img}>
                <img src={props.userPic} alt=""></img>
            </div>
            <div className={classes.main} >
                <div className={classes.textField}>
                    
                    <textarea name="postContent" value={postDesc.desc} onChange={updateData}></textarea>
                </div>
                <div className={classes.extras}>
                    <button onClick={onFormSend} className={classes.tweetButton} >Tweet</button>
                </div>
            </div>
        </div>
    )
}
