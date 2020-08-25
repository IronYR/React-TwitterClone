import React, {useState} from 'react';
import {Redirect} from 'react-router-dom';
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
    function inputsHandler(e, type){
        if(type === "email"){
            setEmail(e.target.value)
        } else if(type === "password"){
            setPassword(e.target.value);
        } else if(type=== "username"){
            setUsername(e.target.value);
        } else if(type=== "name"){
            setName(e.target.value)
        }
    }
    let signUpForm = ()=>(
        <form className={classes.login}>
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
    function onSignUp(){
        let formData = new FormData();
        formData.append("email", email);
        formData.append("name", name);
        formData.append("username", username);
        formData.append("password", password);
        fetch("https://my-rest-api-twitter.herokuapp.com/signup", {
            method: "POST",
            body: formData
        }).then(res=>{
            if(res.status !== 422){
                setSignedUp(true);

            }
            return res.json()
        }).then(result=>{
            setError(result.message);
        }).catch(err=>{
            console.log(err)
            setError(err.message)
        })
    }
    function onLogin(){
        fetch("https://my-rest-api-twitter.herokuapp.com/login", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        }).then(res=>{
            if(+res.status === 200 || +res.status === 201){
                setLoggedin(true);
            }
            return res.json()
        }).then(result=>{
            setError(result.message);
            if(result.message === "Please sign up first" ||result.message === "Something went wrong" || result.message === "Wrong Password" ){
                props.fail()
                return;
            }
            localStorage.setItem('token', result.token);
            localStorage.setItem('userID', result.user._id);
            localStorage.setItem('user', JSON.stringify({name: result.user.name, username: result.user.username, picture: result.user.picture}))
            localStorage.setItem("isAuth", "true");
            let remainingMilliseconds = 30 * 60 * 1000;
            const expiryDate = new Date(new Date().getTime() + remainingMilliseconds )
            localStorage.setItem("expiryDate", expiryDate.toISOString() );
            props.autoLogOut(remainingMilliseconds)
            props.success(true);
            
        }).catch(err=>{
            console.log(err)
            setError(err.message)
        })
    }
    return (
        <div className={classes.authentication}>
            <div className={classes.main}>
                <div className={classes.logo}>
                </div>
                <div className={classes.authDesc}>{props.authDesc}</div>
                {props.type === "login" ? loginForm() : signUpForm()}
                <div className={classes.button}>
                <button onClick={props.type=== "login" ? onLogin: onSignUp} className={classes.loginButton} type="submit">{props.buttonDesc}</button>
                <p className={classes.error}>{error}</p>

                {loggedin ? <Redirect to="/home"/> : null}
                {signedUp ? <Redirect to="/login"/> : null}
                </div>
            </div>
        </div>
    )
}

