import React, { useState, useEffect } from 'react'
import "./Sign.css";
import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';


const Sign = () => {
  let nav = useNavigate();
  const notify = () => toast("Please Login!");
  const [user, setUser] = useState(null);
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    // Function to fetch user information using the stored JWT token
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("authToken"); // Retrieve the token from local storage
        if (token) {
          const response = await axios.get(`${import.meta.env.VITE_BACKENDURL}/api/auth`, {
            headers: {
              "authToken": token           // Send the token in the request headers
            }
          });
          setUser(response.data); // Set the user state with the fetched user data
          setAuth(response.data.auth);
        }

      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData(); // Call the function when the component mounts
  }, []);

  if (auth !== false || user) {
    nav("/")
  }

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKENDURL}/api/signup`, formData);

      if (response.status === 200) {
        // Registration was successful, you can redirect or show a success message
        navigate('/login');
      } else {
        // Handle other responses (e.g., validation errors) here
        console.error('Registration error', response.data.message);
      }
    } catch (error) {
      console.error('Registration error', error.message);
    }
  };


  return (
    <div className="full_screen">

      <div className="bg_sign"
        style={{
          // backgroundColor: 'rgb(6 16 38)',
          // backgroundSize: 'cover',
          // backgroundRepeat: 'no-repeat',
          // backgroundPosition: `center`,
          // content: '',
          // position: ` absolute`,
          // opacity: `1`,
          // top: `0px`,
          // left: `0px`,
          // width: `100%`,
          // height: `46.2rem`,
          // zIndex: `-99`,
          // overflowX: `hidden`,
          // overflowY: `hidden`
        }}
      >
        <div className="bg_sign box">
          <div className="sign_text">Sign up</div>
          <div className="sign_message">
            Explore our site with complete peace of mind, knowing that we prioritize your anonymity and safeguard your online privacy.          </div>
          <form onSubmit={handleSignup} className="sign_form">
            <label htmlFor="username" className="label_username">Username*</label>
            <input
              type="text"
              name="username"
              placeholder='Jh0nny'
              className="input_username"
              value={formData.username}
              onChange={handleInputChange}
              required
            />

            <label htmlFor="email" className="label_email">Email*</label>
            <input type="email"
              name="email"
              placeholder='jonny@gmail.com'
              className="input_email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />

            <label htmlFor="password" className="label_password">Password*</label>
            <input
              type="password"
              name="password"
              placeholder='Enter your password...'
              className="input_password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
            <button onClick={notify} type="submit" className="sign_btn">Register</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Sign