import React from 'react'
import learnImg from "../../assets/learn.jpg"
import { useNavigate } from 'react-router-dom'
import "./Learn.css"

const Learn = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/doc");
  }
  return (
    <>
      <div className="learn">
        <div className="learn_header">
          Learn
        </div>
        <div className="learn_container">
          <div className="img_learn">
            <img src={learnImg} alt="" className="image_learn" />
          </div>
          <div className="write_up_learn">
            <div className="about_comp">Discover the ultimate online experience at BitBucket, where anonymity is paramount. We are committed to protecting your privacy, offering you a secure and anonymous browsing environment where your personal information remains confidential. Your online identity is yours to control, ensuring you can explore, engage, and connect with peace of mind.</div>
            <div className="about_learn"><span className='padding_left_tab'>Learning</span> BitBucket is a valuable skill for anyone interested in version control and collaborative software development. To get started, visit the BitBucket website and create an account. Familiarize yourself with the basic concepts of repositories, branches, and commits. BitBucket offers extensive documentation and tutorials that can guide you through the platform's features. Practice by creating a sample repository, adding files, and making commits. Explore BitBucket's branching and merging capabilities to collaborate effectively with others. Additionally, learn about issues and pull requests for efficient project management. Don't forget to customize your profile and notification settings for a personalized experience. Join online communities and forums to seek help and share knowledge with other BitBucket users. Continuous learning and hands-on experience are the keys to mastering BitBucket for your software development projects</div>
            <div onClick={handleClick} className="learn_more">Learn more...</div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Learn