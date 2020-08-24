import React from 'react';
import classes from './Home.module.css'
import Left from '../UI/LeftSideBar/LeftBar';
import Posts from '../UI/Posts/Posts';
import Right from '../UI/RightSideBar/RightBar'
export default function Home(props) {
    let empty;
    function myFunction(x) {
        if (x.matches) { // If media query matches
        //   document.body.style.backgroundColor = "yellow";
            empty =true;
        } else {
            empty = false;
        }
      }
    var x = window.matchMedia("(max-width: 1000px)")
    myFunction(x) // Call listener function at run time
    x.addListener(myFunction) // Attach listener function on state changes
    return (
        
        <div className={classes.home}>
            <Left logout={props.logout} />
            <Posts></Posts>
            <Right empty={empty}/>
        </div>
        
    )
}
