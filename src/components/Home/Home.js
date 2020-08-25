import React from 'react';
import classes from './Home.module.css'
import Left from '../UI/LeftSideBar/LeftBar';
import Posts from '../UI/Posts/Posts';
import Right from '../UI/RightSideBar/RightBar'
export default function Home(props) {
    let empty;
    function myFunction(x) {
        if (x.matches) {

            empty =true;
        } else {
            empty = false;
        }
      }
    var x = window.matchMedia("(max-width: 1000px)")
    myFunction(x) 
    x.addListener(myFunction) 
    return (
        
        <div className={classes.home}>
            <Left  className={classes.Left}/>
            <Posts className={classes.Post} logout={props.logout}></Posts>
            <Right className={classes.Right} empty={empty}/>
        </div>
        
    )
}
