import React from 'react'
import logo from "../../assets/logo.png"
import "./Footer.css"

const Footer = () => {
  return (
    <div className="background">
        <div className="break_line"></div>
        <div className="footer_details">
            <div className="comp_detailes">
                <img src={logo} alt="" className="brand_logo" />
                <div className="footertxt">&copy;2023 BitBucket, Inc.</div>
            </div>
            <div className="social_media">
                <div className="info_txt">Follow us</div>
                <div className="social_logo">
                <i className="fa-brands fa-square-instagram"></i>
                <i className="fa-brands fa-square-facebook"></i>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Footer