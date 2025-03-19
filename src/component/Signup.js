import React, { useState } from 'react';
import Alert from './Alert';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const Navigate=useNavigate()
  const [mess, setMess] = useState('Welcome to our signup page');
  const [credtionals, setCredtionals] = useState({ name: '', email: '', password: '' });

  const handlesignup = async (e) => {
    e.preventDefault();

    const response = await fetch('http://localhost:4000/api/auth/createuser', {
      method: 'POST', // Should be in uppercase (POST)
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: credtionals.name,
        email: credtionals.email,
        password: credtionals.password,
      }),
    });

    const json = await response.json();
    console.log(json);
    if (json.success === true) {
      setMess('You have successfully created an account');
      Navigate('/login')
    } else {
      setMess('Please enter valid credentials');
      

    }
  };

  const handleChange = (e) => {
    setCredtionals({ ...credtionals, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Alert alert={mess} />
      <div className="container" style={{ justifyContent: 'center', alignItems: 'center' }}>
        <form onSubmit={handlesignup}>
          <div className="mb-3 row">
            <label htmlFor="name" className="col-sm-2 col-form-label">
              Full Name
            </label>
            <div className="col-sm-3 mb-3">
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={credtionals.name}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="mb-3 row">
            <label htmlFor="email" className="col-sm-2 col-form-label">
              Email
            </label>
            <div className="col-sm-3">
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={credtionals.email}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="mb-3 row">
            <label htmlFor="inputPassword" className="col-sm-2 col-form-label">
              Password
            </label>
            <div className="col-sm-3">
              <input
                type="password"
                className="form-control"
                id="inputPassword"
                name="password"
                value={credtionals.password}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <button type="submit" className="btn btn-primary">
              SIGNUP
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Signup;

