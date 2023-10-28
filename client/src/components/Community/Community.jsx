import React from 'react'
import cummBG from "../../assets/communityBG.jpg"
import "./Community.css"

const Community = () => {
  const handleClick = () => {
    // Check is the auth token
    // if yes
    window.location.href = 'https://discord.gg/YourServerInviteCode';
    // else
    // navigate to login
  }
  return (
    <>
      <div className="community">
        <div className="communityBG">
          <img src={cummBG} alt="" className="comimg" />
          <div className="join_comm_txt">
            Explore the vibrant BitBucket community, a hub of knowledge-sharing and collaboration among developers. Connect with like-minded individuals, seek help, and contribute your expertise. Join the <span className='bold'>B</span>it<span className='bold'>B</span>ucket <span className='orange'>community</span> today and be part of this thriving ecosystem!
          </div>
          <div className="notice_cumm">
            <div className="notice_txt">
              join fantastic and futuristic <span className='bold'>b</span>it<span className='bold'>b</span>ucket Community
            </div>
            <button onClick={handleClick} className="join_btn">
              join now
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Community