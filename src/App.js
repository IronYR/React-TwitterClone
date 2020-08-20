import React, {useState} from 'react';
import './App.css';
import Home from './components/Home/Home';
import Landing from "./components/Landing Page/Landing";
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
  if(!isAuth){
    localStorage.removeItem("token");
    localStorage.removeItem("userID");
  }
  function login(){
    // setIsAuth(true);
    localStorage.setItem("isAuth", true);
    setIsAuth(true)
  }
  function logout(){
    setIsAuth(false);
    localStorage.setItem("isAuth", false);
    localStorage.removeItem("token");
    localStorage.removeItem("userID");
  }
  // isAuth = false
  return (
    <BrowserRouter>
    <div className="App">
      {/* {isAuth ? allRoutes()  : authRoutes() } */}
      {/* {isAuth ? <Route path="/" exact render={()=> <Home logout={logout}/>}/> : <Route path="/" exact component={Landing}/>
      }
      {isAuth? <Route path="/signup" exact render={()=> <Home logout={logout}/>}/> : <Route path="/signup" exact render={()=> <Authentication authDesc="Sign Up for Twitter" buttonDesc="Sign Up"/>}/>}
      
      {isAuth? <Route path="/login" exact render={()=> <Home logout={logout}/>}/> : <Route path="/login" exact render={()=> <Authentication success={login} type="login" authDesc="Log in" buttonDesc="Log in" />}/>}
    {isAuth ? <Route path="/home" render={()=> <Home logout={logout}/>}/> : <Route path="/home" exact component={Landing}/>} */}
    <Switch>
    <Route path="/home"  render={()=> <Home logout={logout} isAuth={isAuth}/>}/>
    <Route path="/signup"  render={()=> <Authentication authDesc="Sign Up for Twitter" buttonDesc="Sign Up"/>}/>
    <Route path="/login"  render={()=> <Authentication success={login} type="login" authDesc="Log in" buttonDesc="Log in" />}/>
    <Route path="/"  component={Landing}/>

    </Switch>
    {localStorage.getItem("isAuth") ? null : <Redirect to="/login"></Redirect>}
      
    </div>
    </BrowserRouter>
  );
}

export default App;
