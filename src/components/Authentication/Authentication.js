import React, {useState} from 'react'
import Twitter from '../../images/twitter-logo.png'
import classes from './Authentication.module.css'
import Input from '../UI/Input/Input';
export default function Authentication(props) {
    let [email, setEmail] = useState("");
    let [password, setPassword] = useState(" ")
    function inputsHandler(){
        
    }
    let loginForm = ()=>(
        <form className={classes.login}>
            {/* <label for="email">Email or username</label>
            <input type="text" name="email" className={classes.email}/>
            <label>Password</label>
            <input type="text" name="password" className={classes.password}/> */}
            <Input name="email" type="email" label="Email or username"/>
            <Input name="password" type="password" label="Password"/>

        </form>
    );
    return (
        <div className={classes.authentication}>
            <div className={classes.main}>
                <div className={classes.logo}>
                    <img src={Twitter} alt=""></img>
                </div>
                <div className={classes.authDesc}>Login</div>
                {loginForm()}
                <div className={classes.button}>
                    <button className={classes.loginButton}>Log In</button>
                </div>
            </div>
        </div>
    )
}
