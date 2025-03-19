import { useState } from "react";
import React from 'react';
import Alert from "./Alert";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [message, setMessage] = useState('Welcome to our login page');

  const handleLogin = async (e) => {
    e.preventDefault();

    const response = await fetch('http://localhost:4000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: credentials.email, password: credentials.password })
    });

    const json = await response.json();
    
    if (response.ok && json.success) {
      setMessage('You are successfully logged in');
      localStorage.setItem('token', json.auth_token);
      setTimeout(() => {
        navigate('/home');
      },1000);
     
    } else {
      
      setMessage('Enter valid credentials');
    }
  };

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <> 
      <Alert alert={message} />
      <form onSubmit={handleLogin}>
        <div className="container">
          <div className="mb-3 row">
            <label htmlFor="email" className="col-sm-2 col-form-label">Email</label>
            <div className="col-sm-10">
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={credentials.email}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="mb-3 row">
            <label htmlFor="inputPassword" className="col-sm-2 col-form-label">Password</label>
            <div className="col-sm-10">
              <input
                type="password"
                className="form-control"
                id="inputPassword"
                name="password"
                value={credentials.password}
                onChange={handleChange}
              />
            </div>
          </div>
          <button type="submit" className="btn btn-primary">LOGIN</button>
        </div>
      </form>
    </>
  );
};

export default Login;

