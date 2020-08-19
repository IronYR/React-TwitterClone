import React from 'react';
import './App.css';
import Home from './components/Home/Home';
import Landing from "./components/Landing Page/Landing";
import Authentication from "./components/Authentication/Authentication";
import {BrowserRouter, Route} from 'react-router-dom';
function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Route path="/home" exact component={Home}/>
      <Route path="/" exact component={Landing}/>
      <Route path="/login" exact component={Authentication}/>
    </div>
    </BrowserRouter>
  );
}

export default App;
