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
    function onFormSend(e){
        fetch("http://localhost:5000", {
            method: "POST",
            headers: {
                //@todo: fill this up and send the data
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                "Authorization": 'Bearer ' + token
            },
            body: JSON.stringify({
                postContent: postDesc.desc,
            })
        }).then(res=>{
            return res.json()
        }).then(result=>{
            console.log(result)
            props.created();
            // window.location.reload()
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
                <img src="https://th.bing.com/th/id/OIP.HTvPkLCDOlAYQX-sh8oGogAAAA?w=146&h=150&c=7&o=5&dpr=1.25&pid=1.7" alt=""></img>
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
