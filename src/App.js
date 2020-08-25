import React, {useState} from 'react';
import './App.css';
import Home from './components/Home/Home';
import Landing from "./components/Landing Page/Landing";
import ProtectedRoute from './protectedRoutes';
import User from './components/User/User';
import Edit from './components/UI/Edit User/Edit'
import IndividualPost from './components/Individual Post/IndividualPost'
import {Authentication} from "./components/Authentication/Authentication";
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
function App() {
  let auth = localStorage.getItem("isAuth");
  let [isAuth, setIsAuth] = useState(auth);
  if(isAuth === "false"){
    localStorage.removeItem("token");
    localStorage.removeItem("userID");
    localStorage.removeItem("user")
  }
  function login(){
    localStorage.setItem("isAuth", "true");
    setIsAuth("true");
  }
  function logout(){
    localStorage.setItem("isAuth", "false");
    localStorage.removeItem("token");
    localStorage.removeItem("userID");
    localStorage.removeItem("expiryDate");
    localStorage.removeItem("user");
    window.history.pushState({}, null, "/");
    window.location.reload()
  }
  function failFunc(){
    localStorage.setItem("isAuth", "false");
    setIsAuth("false");
  }
  function autoLogOut(milliseconds){
    setTimeout(()=>{
      logout()
    }, milliseconds)
  }
  let routes = (
    <Switch>
      <Route path="/signup"  exact render={()=> <Authentication authDesc="Sign Up for Twitter" buttonDesc="Sign Up"/>}/>
      <Route path="/login" exact render={()=> <Authentication success={login} fail={failFunc} autoLogOut={autoLogOut} type="login" authDesc="Log in" buttonDesc="Log in" />}/>
      <Route path="/" exact component={Landing}/>
      <Redirect to="/"/>
      <Route path="*" render={()=> <p>404 error</p>}/>
    </Switch>
  )
  if(isAuth==="true"){
    routes= (
      <Switch>
        <ProtectedRoute component={Home} path="/home" isAuth={isAuth} logout={logout} exact/>
        <Route path="/edit/:id" exact render={(props)=> <Edit {...props} logout={logout}/>}/>
        <Route path="/:username" exact render={(props)=><User {...props} logout={logout}/>}/>
        <Route path="/:username/:id" exact render={(props)=><IndividualPost {...props} logout={logout}/>}/>
        <Route path="*" render={()=> <p>404 error</p>}/>
        <Redirect to="/"/>
      </Switch>
    )
  }
  return (
    <BrowserRouter>
      <div className="App">
        {routes}
        {isAuth=="true" ? <Redirect from="/" to="/home"/> : <Redirect from="/home" to="/"/>  }
        {localStorage.getItem("isAuth") == "true" ? null : <Redirect to="/"></Redirect>}
      </div>
    </BrowserRouter>
  );
}

export default App;
