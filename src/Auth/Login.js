import React, { useState, useContext } from 'react';
import axios from 'axios';
import './login.css';
import { Navigate } from 'react-router-dom';
import url from '../url';
import { store } from '../App';

const Login = () => {
  const [isUser, setIsUser] = useState(false);
  const { token, setToken } = useContext(store);

  const login = async (e) => {
    e.preventDefault();
    const obj = {
      username: e.target.username.value,
      password: e.target.password.value,
      email: e.target.email.value
    };

    try {
      const resp = await axios.post(`${url}/login`, obj);
      if (resp.data.resp === "success") {
        setToken(resp.data.token);
        setIsUser(true);
      } else {
        alert("Invalid Credentials");
      }
    } catch (err) {
      console.log(err);
    }
  };

  if (isUser) {
    return <Navigate to="/home" />;
  }

  return (
    <div className='m-login'>
      <div className='m-heading'>
        <h1>Welcome Back User</h1>
      </div>
      <form className='allinp' onSubmit={login}>
        <label>Username:</label><br />
        <input className='username' name='username' type='text' /><br />
        <label>Password:</label><br />
        <input className='password' name='password' type='password' /><br />
        <label>Email:</label><br />
        <input className='username' name='email' type='text' /><br />
        <button className='btn'>Submit</button>
      </form>
    </div>
  );
};

export default Login;
