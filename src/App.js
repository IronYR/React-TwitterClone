import React, {useState} from 'react';
import './App.css';
import Home from './components/Home/Home';
import Landing from "./components/Landing Page/Landing";
import ProtectedRoute from './protectedRoutes';
import User from './components/User/User'
import IndividualPost from './components/Individual Post/IndividualPost'
import {Authentication} from "./components/Authentication/Authentication";
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
function App() {
  // window.onbeforeunload = function(){
  //   logout()
  // }
  let auth = localStorage.getItem("isAuth");
  let [isAuth, setIsAuth] = useState(auth);
  // function getUser(user){
  //   setUser(user);
  // }
  // console.log(user);
  // function token(){
  //   if(!isAuth){

  //   }
  // // }
  // if(isAuth){
  //   window.onbeforeunload = function(){
  //       logout()
  //   }
  //   window.onload = function(){
  //     login()
  //   }
  // }
  if(isAuth == "false"){
    localStorage.removeItem("token");
    localStorage.removeItem("userID");
    localStorage.removeItem("user")
  }
  function login(){
    // setIsAuth(true);
    localStorage.setItem("isAuth", "true");
    setIsAuth("true");
    // setTimeout(()=> window.location.reload(), 2000)
  }
  function logout(){
    // setIsAuth(false);
    localStorage.setItem("isAuth", "false");
    localStorage.removeItem("token");
    localStorage.removeItem("userID");
    localStorage.removeItem("expiryDate");
    localStorage.removeItem("user")
    window.location.reload()
  }
  function failFunc(){
    localStorage.setItem("isAuth", "false");
    setIsAuth("false");
    setTimeout(()=> window.location.reload(), 2000)
  }
  function autoLogOut(milliseconds){
    setTimeout(()=>{
      logout()
    }, milliseconds)
  }
  // isAuth = false
  let routes = (
    <Switch>
    <Route path="/signup"  exact render={()=> <Authentication authDesc="Sign Up for Twitter" buttonDesc="Sign Up"/>}/>
    <Route path="/login" exact render={()=> <Authentication success={login} fail={failFunc} autoLogOut={autoLogOut} type="login" authDesc="Log in" buttonDesc="Log in" />}/>
    <Route path="/" exact component={Landing}/>
    <Redirect to="/"/>
    <Route path="*" render={()=> <p>404 error</p>}/>

    </Switch>
  )
  if(isAuth=="true"){
    routes= (
      <Switch>
        <ProtectedRoute component={Home} path="/home" isAuth={isAuth} logout={logout} exact/>
        <Route path="/:username" exact component={User}/>

        <Route path="/:username/:id" exact component={IndividualPost}/>
        
        <Route path="*" render={()=> <p>404 error</p>}/>

        <Redirect to="/"/>

      </Switch>
    )
  }
  return (
    <BrowserRouter>
    <div className="App">
      {/* {isAuth ? allRoutes()  : authRoutes() } */}
      {/* {isAuth ? <Route path="/" exact render={()=> <Home logout={logout}/>}/> : <Route path="/" exact component={Landing}/>
      }
      {isAuth? <Route path="/signup" exact render={()=> <Home logout={logout}/>}/> : <Route path="/signup" exact render={()=> <Authentication authDesc="Sign Up for Twitter" buttonDesc="Sign Up"/>}/>}
      
      {isAuth? <Route path="/login" exact render={()=> <Home logout={logout}/>}/> : <Route path="/login" exact render={()=> <Authentication success={login} type="login" authDesc="Log in" buttonDesc="Log in" />}/>}
    {isAuth ? <Route path="/home" render={()=> <Home logout={logout}/>}/> : <Route path="/home" exact component={Landing}/>} */}
    {/* <Switch> */}
    {/* <Route path="/home"  render={()=> <Home logout={logout} isAuth={isAuth}/>}/> */}
      {/* <ProtectedRoute component={Home} path="/home" isAuth={isAuth} logout={logout} exact/> */}
  
      
      {/* <Route path="/signup"  exact render={()=> <Authentication authDesc="Sign Up for Twitter" buttonDesc="Sign Up"/>}/>
      <Route path="/login" exact render={()=> <Authentication success={login} fail={failFunc} autoLogOut={autoLogOut} type="login" authDesc="Log in" buttonDesc="Log in" />}/> */}
    {routes}
      

      {/* <Route path="/:username/:id/comments/:commentID" component={IndividualPost}/> */}

      {isAuth=="true" ? <Redirect from="/" to="/home"/> : <Redirect from="/home" to="/"/>  }
      
      
      {/* <Route path="/" exact component={Landing}/> */}
      
     
    {/* </Switch> */}
    {localStorage.getItem("isAuth") == "true" ? null : <Redirect to="/"></Redirect>}
      
    </div>
    </BrowserRouter>
  );
}

export default App;
