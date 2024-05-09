import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Alert } from '@mui/material';
import { Footer, Navbar } from "../components";
import axios from 'axios'; 
import { useNavigate } from 'react-router-dom'; 

const Login = () => {
  const location = useLocation();
  const { alert } = location.state || {};
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (alert) {
        setShowAlert(true);
        const timer = setTimeout(() => {
            setShowAlert(false);
        }, 5000); 
        return () => clearTimeout(timer);
    }
  }, [alert]);

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (userId) {
      navigate('/', { state: { alert: { message: 'You are already logged in.', severity: 'info' } } });
    }
  }, [navigate]);

  const handleLoginSuccess = (userId) => {
    localStorage.setItem('userId', userId); 
    localStorage.setItem('email', email); 
    navigate('/', { state: { alert: { message: 'Login successful', severity: 'success' } } });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:7000/login', { email, password })
      .then(result => {
        console.log('Result from server:', result.data); 
        const { userId } = result.data; 
        if (userId) {
          handleLoginSuccess(userId); 
        }
      })
      .catch(err => console.error('Error during login:', err.response.data));
  }
  
  return (
    <>
      <Navbar />

      <div className="container my-3 py-3">
        <h1 className="text-center">Login</h1>
        <hr />
        {showAlert && alert && (
          <Alert severity={alert.severity} sx={{ fontSize: '0.8rem', padding: '8px 16px' }}>
            {alert.message}
          </Alert>)}
        <div className="row my-4 h-100">
          <div className="col-md-4 col-lg-4 col-sm-8 mx-auto">
            <form onSubmit={handleSubmit}> 
              <div className="my-3">
                <label htmlFor="display-4">Email address</label>
                <input
                  type="email"
                  className="form-control"
                  id="floatingInput"
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="my-3">
                <label htmlFor="floatingPassword display-4">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="floatingPassword"
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="my-3">
                <p>New Here? <Link to="/register" className="text-decoration-underline text-info">Register</Link> </p>
                <p>Forgot your password ?<Link to="/forgotpassword" className="text-decoration-underline text-info">Forgot Password?</Link> </p>
              </div>
              <div className="text-center">
                <button className="my-2 mx-auto btn btn-dark" type="submit">
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
