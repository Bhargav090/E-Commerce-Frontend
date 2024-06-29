import React, { useState } from 'react';
import url from '../url';
import axios from 'axios';
import { Navigate } from 'react-router-dom';

export default function Signup() {
  const [isUser, setIsUser] = useState(false);

  const signup = async (e) => {
    e.preventDefault();
    let obj = {
      username: e.target.username.value,
      password: e.target.password.value,
      email: e.target.email.value,
      confirmpassword: e.target.confirmpassword.value,
    };

    try {
      const resp = await axios.post(url + '/signup', obj);
      if (resp.data.resp === "success") {
        setIsUser(true);
      } else if (resp.data.resp === "Exist") {
        alert("Already Exist Please Login");
      } else if (resp.data.resp === "notmatched") {
        alert("Password and Confirm password not matched");
      }
    } catch (err) {
      console.log(err);
    }
  };

  if (isUser) {
    return <Navigate to="/" />;
  }

  return (
    <div className='m-login'>
      <div className='m-heading'>
        <h1>Welcome User, Please Signup</h1>
      </div>
      <form className='allinp' onSubmit={signup}>
        <label>Username:</label><br />
        <input className='username' name='username' type='text' /><br />
        <label>Password:</label><br />
        <input className='password' name='password' type='password' /><br />
        <label>Email:</label><br />
        <input className='username' name='email' type='text' /><br />
        <label>Confirm Password:</label><br />
        <input className='password' name='confirmpassword' type='password' /><br />
        <button className='btn'>Submit</button>
      </form>
    </div>
  );
}
