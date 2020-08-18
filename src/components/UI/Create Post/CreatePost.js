import React from 'react'
import classes from './CreatePost.module.css'
export default function CreatePost() {
    const tx = document.getElementsByTagName('textarea');
    for (let i = 0; i < tx.length; i++) {
    tx[i].setAttribute('style', 'height:' + (tx[i].   scrollHeight) + 'px;overflow-y:hidden;');
    tx[i].addEventListener("input", OnInput, false);
    }

    function OnInput() {
      this.style.height = 'auto';
      this.style.height = (this.scrollHeight) + 'px';
    }
    return (
        <div className={classes.createPost}>
            <div className={classes.img}>
                <img src="https://th.bing.com/th/id/OIP.HTvPkLCDOlAYQX-sh8oGogAAAA?w=146&h=150&c=7&o=5&dpr=1.25&pid=1.7"></img>
            </div>
            <form className={classes.main}>
                <div className={classes.textField}>
                    
                    <textarea name="postContent" placeholder="What's happening?"></textarea>
                </div>
                <div className={classes.extras}>
                    <button className={classes.tweetButton} >Tweet</button>
                </div>
            </form>
        </div>
    )
}
