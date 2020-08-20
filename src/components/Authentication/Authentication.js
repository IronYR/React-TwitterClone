import React, {useState} from 'react';
import {Redirect} from 'react-router-dom';
import Twitter from '../../images/twitter-logo.png'
import classes from './Authentication.module.css'
import Input from '../UI/Input/Input';
export function Authentication(props) {
    let [loggedin, setLoggedin] = useState(false);
    let [signedUp, setSignedUp] = useState(false);
    let [error, setError] = useState("");
    let [email, setEmail] = useState("");
    let [username, setUsername] = useState("");
    let [password, setPassword] = useState("");
    let [name, setName] = useState("");
    // let [userID, setUserID] = useState("");
    function inputsHandler(e, type){
        if(type == "email"){
            setEmail(e.target.value)
        } else if(type == "password"){
            setPassword(e.target.value);
        } else if(type== "username"){
            setUsername(e.target.value);
        } else if(type== "name"){
            setName(e.target.value)
        }
    }
    let signUpForm = ()=>(
        <form className={classes.login}>
            {/* <label for="email">Email or username</label>
            <input type="text" name="email" className={classes.email}/>
            <label>Password</label>
            <input type="text" name="password" className={classes.password}/> */}
            <Input name="email" type="email" label="Email" onInputHandler={inputsHandler}/>
            <Input name="username" type="text" label="Username" onInputHandler={inputsHandler}/>
            <Input name="name" type="text" label="Name" onInputHandler={inputsHandler}/>
            <Input name="password" type="password" label="Password" onInputHandler={inputsHandler}/>
            
        </form>
    );
    let loginForm= ()=>(
        <form className={classes.login}>
            <Input name="email" type="email" label="Email" onInputHandler={inputsHandler}/>
            <Input name="password" type="password" label="Password" onInputHandler={inputsHandler}/>

        </form>
    )
    // function onAuth(url, payload){
    //     fetch("http://localhost:5000/"+ url, {
    //         method: "POST",
    //         headers: {
    //             //@todo: fill this up and send the data
    //             'Content-Type': 'application/json',
    //             'Accept': 'application/json'
    //         },
    //         body: JSON.stringify({
    //             payload: payload
    //         })
    //     }).then(res=>{
    //         return res.json()
    //     }).then(result=>{
    //         console.log(result)
    //         setError(result.message);
    //         props.sendID(result.userID)
    //     }).catch(err=>{
    //         console.log(err)
    //         setError(err.message)
    //     })
    // }
    function onSignUp(){
        fetch("http://localhost:5000/signup", {
            method: "POST",
            headers: {
                //@todo: fill this up and send the data
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                name: name,
                username: username,
                password: password

            })
        }).then(res=>{
            return res.json()
        }).then(result=>{
            console.log(result)
            setSignedUp(true);
            setError(result.message);
        }).catch(err=>{
            console.log(err)
            setError(err.message)
        })
    }
    function onLogin(){
        fetch("http://localhost:5000/login", {
            method: "POST",
            headers: {
                //@todo: fill this up and send the data
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        }).then(res=>{
            // console.log(res)
            if(res.ok){
                setLoggedin(true);
            }
            return res.json()
        }).then(result=>{
            console.log(result)
            setError(result.message);
            localStorage.setItem('token', result.token);
            localStorage.setItem('userID', result.userID);
            localStorage.setItem("isAuth", true)
            // props.sendUser(result.user)
            props.success(true);
        }).catch(err=>{
            console.log(err)
            setError(err.message)
        })
    }
    console.log(email, password)
    return (
        <div className={classes.authentication}>
            <div className={classes.main}>
                <div className={classes.logo}>
                    <img src={Twitter} alt=""></img>
                </div>
                <div className={classes.authDesc}>{props.authDesc}</div>
                {props.type == "login" ? loginForm() : signUpForm()}
                <div className={classes.button}>
                <button onClick={props.type== "login" ? onLogin: onSignUp} className={classes.loginButton}>{props.buttonDesc}</button>
                <p>{error}</p>
                {loggedin ? <Redirect to="/home"/> : null}
                {signedUp ? <Redirect to="/login"/> : null}
                </div>
            </div>
        </div>
    )
}


//have a check to see if you have to render signup or login, it will be passed from the props