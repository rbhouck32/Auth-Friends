import React, { useState } from "react";

import axios from "axios";

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
    <div>
      <form onSubmit={login}>
        <input
          type="text"
          name="username"
          value={credentials.username}
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          value={credentials.password}
          onChange={handleChange}
        />
        <button>Log In</button>
      </form>
    </div>
  );
};

export default Login;
