import React from 'react'
import "./Slider.css"
import { Link } from 'react-scroll'


const slider = () => {
  return (
    <div className="ul">
        <Link className='nav_link color_white' spy={true} smooth={true} to="repo"><li className="list_items">Repository</li></Link>
        <Link className='nav_link color_white' spy={true} smooth={true} to="learn"> <li className="list_items">Learn</li></Link>
        <Link className='nav_link color_white' spy={true} smooth={true} to="launchpad"> <li className="list_items">Launchpad</li></Link>
        <Link className='nav_link color_white' spy={true} smooth={true} to="communityBG"> <li className="list_items">Community</li></Link>
    </div>
  )
}

export default slider