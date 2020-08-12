import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";

const Login = (props) => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const login = (e) => {
    e.preventDefault();
    console.log("hello");
    axios
      .post("http://localhost:5000/api/login", credentials)
      .then((res) => {
        console.log("rh: login success: res ", res);
        localStorage.setItem("authToken", res.data.payload);
        console.log(res.data.payload);
        props.history.push("/protected");
      })
      .catch((err) => {
        console.error("rh: login failed: err:", err.message);
        localStorage.removeItem("authToken");
      });
  };

  return (
    <Container>
      <Logo
        src="https://upload.wikimedia.org/wikipedia/commons/b/bc/Friends_logo.svg"
        alt="friends-logo"
      />
      <Form onSubmit={login}>
        <Input
          type="text"
          name="username"
          value={credentials.username}
          onChange={handleChange}
          placeholder="Name"
        />

        <Input
          type="password"
          name="password"
          value={credentials.password}
          onChange={handleChange}
          placeholder="Password"
        />
        <Button>Log In</Button>
      </Form>
    </Container>
  );
};

export default Login;

const Container = styled.div`
  width: 100%;
  height: 1000px;
  background-color: #282c34;
`;

const Logo = styled.img`
  padding-top: 100px;
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 50%;
`;

const Input = styled.input`
  margin-right: 1rem;
  padding: 0.5em;
  background: papayawhip;
  color: crimson;
  border-radius: 10px;
  font-weight: bold;
  &::-webkit-input-placeholder {
    color: palevioletred;
  }
`;

const Button = styled.button`
  padding: 0.5em;
  background-color: papayawhip;
  border-radius: 10px;
  border: none;
  font-weight: bold;
  color: crimson;
  width: 100px;
`;

const Form = styled.form`
  display: flex;
  justify-content: center;
`;
