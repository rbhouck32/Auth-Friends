import React from "react";
import { NavLink } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <header className="App-header">
        Welcome to the FRIENDS app!
        <NavLink to="/login">Click Here to Get Started!</NavLink>
      </header>
    </div>
  );
};

export default Home;
