import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "./styles/Login.css"

const Login = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("https://speedybites-backend.onrender.com/api/login", {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({ email: credentials.email, password: credentials.password })
    });
    const json = await response.json();

    if (!json.success) {
      alert("Enter Valid Credentials");
    }
    if (json.success) {
      localStorage.setItem("authToken", json.authToken);
      localStorage.setItem("userEmail",credentials.email);
      console.log(localStorage.getItem("authToken"));
      navigate("/");
    }
  };

  const onChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <form onSubmit={handleSubmit} className="login-box">
            <h2>Login</h2>
            <div className="user-box">
              <input type="text" name="email" value={credentials.email} onChange={onChange} required />
              <label>Email</label>
            </div>
            <div className="user-box">
              <input type="password" name="password" value={credentials.password} onChange={onChange} required />
              <label>Password</label>
            </div>
            <button type="submit">
              Submit
            </button>
            <Link to={"/signup"} className="m-3">Don't have an Account</Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
