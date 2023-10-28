import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
// import { Link } from "react-scroll"
import { Link } from "react-router-dom"
import axios from 'axios';
import { toast } from 'react-toastify';
import profile from "../../assets/profile.png"
import "./Navbar.css"
import Slider from '../../pages/Slider';
import LogoSlider from '../../pages/LogoSlider';


const Navbar = () => {

  const [user, setUser] = useState(null);
  const [auth, setAuth] = useState(null)
  const [app, setApp] = useState(false)
  const [active, setActive] = useState(false)

  let navigate = useNavigate();
  const logout = () => {
    navigate("/login");
    localStorage.removeItem("authToken")
    toast("Logout Successful!")
  }

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

  const handleBurgerClick = () => {
    setApp(!app)
  }
  useEffect(() => {

    if (window.innerWidth > 725) {
      setActive(false);
    }
    else if(window.innerWidth < 725){
      setActive(true);
    }

  }, [])

  return (
    < >
      <div className="pos_fixed">
        <div className="nav">
          <div className='logo_profile'>
            <div className="profile-pic">
              <Link to="/profile"><img src={profile} alt="" className="pic" /></Link>
              {(auth !== false && auth !== null) ? (
                <span className="profile_username">{user.username}</span>
              ) : (
                <span className="profile_username">Unknown</span>
              )}
            </div>
            <div className="logoSlider">
              <LogoSlider />
            </div>
          </div>
          <div >
            <div className="NavSlider">
              <Slider />
            </div>
            <div className="hamNavbar showIcoHam">
              <div className={!active ? "noHam" : "hamIcon showHam"}>
                <i className="fa-solid fa-bars" onClick={handleBurgerClick} style={{ "color": "#ffffff" }}></i>
              </div>
              <div className={active === true && app ? "hamburger-menu" : "hamMenuNone"}>
                <div className="profile-pic">
                  <Link to="/profile"><img src={profile} alt="" className="pic" /></Link>
                  {(auth !== false && auth !== null) ? (
                    <span className="navUsername">{user.username}</span>
                  ) : (
                    <span className="navUsername">Unknown</span>
                  )}
                </div>
                <div className="hamIcon showHam">
                  <i className="fa-solid fa-x" onClick={handleBurgerClick} style={{ "color": "black" }}></i>
                </div>
                <Slider />
                <LogoSlider />
              </div>
            </div>
          </div>
          <div className="login">
            {(auth !== false && user) ? (
              <button onClick={logout} className="login_btn">Logout</button>
            ) : (
              <a href="/login"><button className="login_btn">Login</button></a>
            )}
          </div>
        </div>
      </div>
    </>
  )
  // }
}

export default Navbar