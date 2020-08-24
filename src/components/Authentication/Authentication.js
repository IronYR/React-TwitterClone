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
    let [img, setImg] = useState({});
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
        } else if(type=="file"){
            console.log(e.target)
            setImg(e.target.files[0])
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
            <Input name="file" type='file' label="File" onInputHandler={inputsHandler}/>
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
        let formData = new FormData();
        formData.append("email", email);
        formData.append("name", name);
        formData.append("username", username);
        formData.append("password", password);
        formData.append("image", img);
        console.log(formData)
        fetch("http://localhost:5000/signup", {
            method: "POST",
            // headers: {
            //     //@todo: fill this up and send the data
            //     'Content-Type': 'application/json',
            //     'Accept': 'application/json'
            // },
            body: formData
        }).then(res=>{
            if(res.status != 422){
                setSignedUp(true);

            }
            return res.json()
        }).then(result=>{
            console.log(result)
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
            console.log(res)
            if(+res.status == 200 || +res.status == 201){
                setLoggedin(true);
            }
            return res.json()
        }).then(result=>{
            console.log(result)
            setError(result.message);
            if(result.message == "Please sign up first" ||result.message == "Something went wrong" || result.message == "Wrong Password" ){
                props.fail()
                return;
            }
            console.log(loggedin)
            localStorage.setItem('token', result.token);
            localStorage.setItem('userID', result.user._id);
            localStorage.setItem('user', JSON.stringify({name: result.user.name, username: result.user.username, picture: result.user.picture}))
            localStorage.setItem("isAuth", "true");
            let remainingMilliseconds = 30 * 60 * 1000;
            const expiryDate = new Date(new Date().getTime() + remainingMilliseconds )
            localStorage.setItem("expiryDate", expiryDate.toISOString() );
            props.autoLogOut(remainingMilliseconds)
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
                <button onClick={props.type== "login" ? onLogin: onSignUp} className={classes.loginButton} type="submit">{props.buttonDesc}</button>
                <p>{error}</p>
                {loggedin ? <Redirect to="/home"/> : null}
                {signedUp ? <Redirect to="/login"/> : null}
                </div>
            </div>
        </div>
    )
}


//have a check to see if you have to render signup or login, it will be passed from the props