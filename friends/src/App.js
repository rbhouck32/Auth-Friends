import React from "react";
import logo from "./logo.svg";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  NavLink,
  
} from "react-router-dom";
import Login from "./components/Login";
import PrivateRoute from "./components/PrivateRoute";
import FriendsList from "../src/components/FriendsList";
import Home from "./components/Home";

function App() {
  return (
    <Router>
      <div className="App-Container">
        <Switch>
          <Route exact path="/" component={Home} />
          <PrivateRoute exact path="/protected" component={FriendsList} />
          <Route exact path="/login" component={Login} />
        </Switch>
      </div>    
    </Router>
  );
}

export default App;
