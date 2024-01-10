import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "./styles/Signup.css"

const Signup = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ name: "", email: "", password: "", geolocation: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("https://speedybites-backend.onrender.com/api/createuser", {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password, location: credentials.geolocation })
    });
    const json = await response.json();

    if (!json.success) {
      alert("Enter Valid Credentials");
    }
    if (json.success) {
      navigate("/login");
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
            <h2>Sign Up</h2>
            <div className="user-box">
              <input type="text" name="name" value={credentials.name} onChange={onChange} required />
              <label>Name</label>
            </div>
            <div className="user-box">
              <input type="email" name="email" value={credentials.email} onChange={onChange} required />
              <label>Email</label>
            </div>
            <div className="user-box">
              <input type="password" name="password" value={credentials.password} onChange={onChange} required />
              <label>Password</label>
            </div>
            <div className="user-box">
              <input type="text" name="geolocation" value={credentials.geolocation} onChange={onChange} required />
              <label>Location</label>
            </div>
            <button type="submit">
              Submit
            </button>
            <Link to={"/login"} className="m-3">Already a user</Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
