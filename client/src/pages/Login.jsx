import React, { useState, useEffect } from 'react'
import logo from "../assets/logo.png"
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import "./Login.css"
import axios from 'axios'
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
{/* <ToastContainer /> */ }

const Login = (props) => {

  let nav = useNavigate();

  if (props.user || props.auth !== false) {
    nav("/")
  }
  const [userData, setUserData] = useState({
    username: '',
    password: '',
  });

  const navigate = useNavigate(); // Create a navigate object for navigation

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKENDURL}/api/login`, userData);

      // Check if the login was successful and a token was received
      if (response.status === 200 && response.data.token) {
        // Store the token in localStorage or sessionStorage for future requests
        localStorage.removeItem('authToken')
        localStorage.setItem('authToken', response.data.token); // You can use sessionStorage if you want the token to be temporary

        // Redirect to the dashboard or any protected route upon successful login
        navigate('/');
      } else {
        // Handle login error (e.g., display an error message)
        console.error('Login error', response.data.message);
      }
    } catch (error) {
      console.error('Login error', error.message);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  return (
    <>
      <div className="login">
        <div className="login_container">
          {/* <div style={{
            backgroundColor: "rgb(0 7 33)",
            content: '',
            position: ` absolute`,
            opacity: `1`,
            top: `0px`,
            left: `0px`,
            width: `100%`,
            height: `46.2rem`,
            zIndex: `-99`,
            overflowX: `hidden`,
            overflowY: `hidden`
          }}>
          </div > */}


          <div className="main_logo">
            <img src={logo} alt="" className="logo_img" />
            <div className="logo color_white">
              <span className="bold">B</span>
              it
              <span className="bold">B</span>
              ucket
            </div>
          </div>

          <div className="login_form">
            <form onSubmit={handleLogin} className="form">

              <div className="inputs">

                <input
                  type="text"
                  name='username'
                  className="username"
                  placeholder='Username'
                  value={userData.username}
                  onChange={handleInputChange}
                  required />

                <input
                  type="password"
                  name='password'
                  className="password"
                  placeholder='Password'
                  value={userData.password}
                  onChange={handleInputChange}
                  required />

                <div className='flex'>
                  <input required type="radio" className='radio_check' /><span className="radio_text">I'm not a robot</span>
                </div>
              </div>
              <div className="submit">
                <button type="submit" className='login_btn'>Login</button>
                <span className='txt_small'>Don't have account <Link to="/signup" className='sign_redirect'> Sign up</Link></span>
              </div>
            </form>
          </div>
        </div>
      </div >
    </>
  )
}

export default Login