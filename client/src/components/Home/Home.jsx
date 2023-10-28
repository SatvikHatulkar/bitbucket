import React, { useEffect, useState } from 'react'
import bg from "../../assets/bg.jpg"
import "./Home.css"
import { Link, useNavigate } from 'react-router-dom'
import Repo from '../Repo/Repo';
import Learn from '../Learn/Learn';
import Launchpad from '../Launchpad/Launchpad';
import Community from '../Community/Community';
import Navbar from '../Navbar/Navbar';


const Home = ({user, auth}) => {

  // const [width, setWidth] = useState("")
  // const [height, setHeight] = useState("")
  let nav = useNavigate();

  // useEffect(() => {
  // let winWidth = window.innerWidth;
  // let winHeight = window.innerHeight;
  // setWidth(winWidth);
  // setHeight(winHeight);
  // },[])

  // console.log(width, height)
  

  const handleClickCreRepo = ()=>{
    nav("/user/createrepo")
  }
  const handleClickRepo = ()=>{
    nav("/user/repoexplorer")
  }


  return (
    <>
      <Navbar />
      <div className="home">
        <div  style={{
          backgroundImage: `url(${bg})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: `center`,
          content: '',
          position: ` absolute`,
          opacity: `1`,
          top: `0px`,
          left: `0px`,
          width: `100%`,
          height: `100%`,
          zIndex: `-99`,
          overflowX: `hidden`,
          overflowY: `hidden`
        }
        }className="firstPage">
        </div >
        <div style={{
          position: `absolute`,
          top: `1rem`,
          left: `-6rem`,
          backgroundColor: `orangered`,
          borderRadius: `50%`,
          filter: `blur(150px)`,
          width: `41%`,
          height: `55%`,
          zIndex: `-98`,
        }}>
        </div>
        <div style={{
          position: `absolute`,
          top: `15rem`,
          right: `0`,
          borderRadius: `50%`,
          filter: `blur(150px)`,
          width: `38%`,
          height: `55%`,
          zIndex: `-97`,
          backgroundColor: `magenta`
        }}>
        </div>
        <div style={{
          position: `absolute`,
          top: `-4rem`,
          left: `0`,
          filter: `blur(85px)`,
          width: `100%`,
          height: `10rem`,
          zIndex: `-97`,
          backgroundColor: `black`
        }}>

        </div>
        <div style={{
          position: `absolute`,
          top: `-4rem`,
          right: `0`,
          filter: `blur(300px)`,
          width: `100%`,
          height: `10rem`,
          zIndex: `-97`,
          backgroundColor: `black`
        }}>

        </div>
        <div style={{
          position: `absolute`,
          top: `37rem`,
          left: `0`,
          filter: `blur(28px)`,
          width: `80%`,
          height: `16%`,
          zIndex: `-97`,
          backgroundColor: `black`,
        }}>

        </div>
        <div style={{
          position: `absolute`,
          top: `37rem`,
          right: `0`,
          filter: `blur(28px)`,
          width: `80%`,
          height: `16%`,
          zIndex: `-97`,
          backgroundColor: `black`,
        }}>

        </div>
        <div className="line">
          <div className="home_container fontRoboto">
            <div className="tag_home">GitLab</div>
            <div className="main_home">
              <div className="mainTagHome">Codeberg</div>
              <div className="mainWordsHome">SourceForge</div>
            </div>
          </div>
          <div className="mainButtonsHome">
            <div className="exploreHome">
              {(auth !== false) ? (
                <button onClick={handleClickCreRepo} className="expBtn">
                  <span className="wordExp">Create Repository</span>
                </button>
              ) : (
                <button className="expBtn">
                  <span className="wordExp">Explore</span>
                </button>
              )}
            </div>
            <div className="signHome">
              {(auth !== false && user) ? (
                <button onClick={handleClickRepo} className="signBtn">
                  <span className="myRepo">MY Repositories</span>
                </button>
              ) : (
                <button className="signBtn">
                  <i className="fa-solid fa-arrow-right-to-bracket"></i>
                  <Link to="/signup" className='signup'> Sign up</Link>
                </button>
              )}
            </div>
          </div>
        </div>
      </div >
      <Repo />
      <Learn />
      <Launchpad />
      <Community />
    </>
  )
}

export default Home