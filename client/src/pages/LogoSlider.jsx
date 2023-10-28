import React from 'react'
import { Link } from 'react-scroll'
import "./logoSlider.css"


const LogoSlider = () => {
    return (
        <div>
            <Link className='nav_link' spy={true} smooth={true} to="firstPage">
                <div className="logo color_white fsLow">
                    <span className="bold fsLow">B</span>
                    it
                    <span className="bold fsLow">B</span>
                    ucket
                </div>
            </Link></div>
    )
}

export default LogoSlider