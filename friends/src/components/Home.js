import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const Home = () => {
  return (
    <div>
      <header className="App-header">
        <Logo
          src="https://upload.wikimedia.org/wikipedia/commons/b/bc/Friends_logo.svg"
          alt="friends-logo"
        />
        <NavLink
          style={{ textDecoration: "none", color: "#fabc16" }}
          to="/login"
        >
          Click Here to Get Started!
        </NavLink>
      </header>
    </div>
  );
};

export default Home;

const Logo = styled.img`
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 50%;
`;
