// import React from 'react'
// import profile from "../../assets/profile.png"
// import "./Profile.css"
// import { useNavigate } from 'react-router-dom'

// const Profile = () => {
//   const navigate = useNavigate();
//   const handleClick = ()=>{
//     navigate("/editprofile")
//   }

//   return (
//     <>
//       <div className="profile">
//         <div className="profile_about">
//           <div className="info_box">
//             <img src={profile} alt="" className="profile_img" />
//             <div className="txt_info_box">
//               <table >
//                 <tr>
//                   <td className='static'>Name:</td>
//                   <td>WWE_Minimania</td>
//                 </tr>
//                 <tr>
//                   <td className='static'>Email:</td>
//                   <td>WWE_Minimania@gmail.com</td>
//                 </tr>
//                 <tr>
//                   <td className='static'>Skills:</td>
//                   <td>Malware Dev, Js, Python, C/C++, Full-Stack Devlopement</td>
//                 </tr>
//               </table>
//               {/* <div className="show_about_static">
//                 <span className="show_about">name:</span>
//                 //auth require
//                 <span className="show_about">Email:</span>
//                 <span className="show_about">Skills:</span>
//               </div>
//               <div className="show_about_dynamic">
//                 <span className="show_about_info">WWE_Minimania</span>
//                 <span className="show_about_info">WWE_Minimania@gmail.com</span>
//                 <span className="show_about_info">Malware Dev, Js, Python, C/C++, Full-Stack Devlopement</span>
//               </div> */}
//             </div>
//             <div className="follow_now">
//               <button className="follow_btn">Follow Me</button>
//             </div>
//             <div className="edit_now">
//               <button onClick={handleClick} className="edit_btn">Edit Profile</button>
//             </div>
//           </div>
//         </div>
//         <div className="divider_line"></div>
//         <div className="repo_of_profile">
//           <div className="repo_column">
//             <div className="container_repo">
//               {/* <div className="profile_title">
//                 <div className="profile_repo">
//                   <img src={profile} alt="" className="image_profile_repo" />
//                   <span className="proflie_username">Username</span>
//                 </div> */}
//               <div className="title_repo">
//                 <div className="title_topic">Malware</div>
//                 <div className="desc_topic">Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi temporibus debitis aspernatur, eum qui rem quae saepe repellat voluptatem non eaque architecto a dolorem sit eius! Dicta quo illo dolores?</div>
//               </div>
//               {/* </div> */}
//               <div className="tags_repo">
//                 <div className="tag1_repo">Malware Dev</div>
//                 <div className="tag1_repo">C/C++</div>
//                 <div className="tag1_repo">CyberSecurity</div>
//               </div>
//               <div className="upl_date">
//                 <span className="date">Up on 24 Apr 2023</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   )
// }

// export default Profile



import React, { useState, useEffect } from 'react';
import profile from '../../assets/profile.png';
import './Profile.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Profile = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const authToken = localStorage.getItem('authToken');
      if (!authToken) {
        // Redirect to login page if authToken is not available
        navigate('/login');
        return;
      }

      try {
        const userResponse = await axios.get(`${import.meta.env.VITE_BACKENDURL}/api/auth`, {
          headers: {
            authToken: authToken,
          },
        });

        const repoResponse = await axios.get(`${import.meta.env.VITE_BACKENDURL}/user/allrepos`, {
          headers: {
            authToken: authToken,
          },
        });

        setUserData(userResponse.data);
        setRepositories(repoResponse.data);
      } catch (error) {
        console.error(error);
        // Handle error (e.g., redirect to login page)
      }
    };

    fetchData();
  }, [navigate]); // Include navigate function in dependency array to avoid missing dependency warning

  const handleClick = () => {
    navigate('/editprofile');
  };
  const navHome = () => {
    navigate('/');
  };

  return (
    <>
      <div className="profile">
        <div className="profile_about">
        <div onClick={navHome} className="logo color_white">
                    <span className="bold">B</span>
                    it
                    <span className="bold">B</span>
                    ucket
                </div>
          <div className="info_box">
            <img src={profile} alt="" className="profile_img" />
            <div className="txt_info_box">
              <table>
                <tbody>
                  <tr>
                    <td className="static">Name:</td>
                    <td>{userData.username}</td>
                  </tr>
                  <tr>
                    <td className="static">Email:</td>
                    <td>{userData.email}</td>
                  </tr>
                  <tr>
                    <td className="static">Skills:</td>
                    <td>{userData.skills || 'No Skills!'}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="edit_now">
              <button onClick={handleClick} className="edit_btn">
                Edit Profile
              </button>
            </div>
          </div>
        </div>
        <div className="divider_line"></div>
        <div className="section_repo">
          <span className="section_title padding_top_less">Repositories</span>
          <div className="repo_of_profile">
            {repositories.map((repo, index) => (
              <Link 
              key={repo._id} 
              className="repo_column"
              to="/user/createrepo/collection"
              state={{
                repository: {repo},
                index: index
            }}
              >
                <div className="container_repo">
                  <div className="title_repo">
                    <div className="title_topic">{repo.repository}</div>
                    <div className="desc_topic">Description goes here...</div>
                  </div>
                  {/* <div className="tags_repo">
                  {repo.tags.map((tag) => (
                    <div key={tag._id} className="tag1_repo">
                      {tag?tag.name:"No Tags"}
                    </div>
                  ))}
                </div> */}
                  <div className="tags_repo">
                    {repo.tags.length > 0 ? (
                      repo.tags.map((tag) => (
                        <div key={tag._id} className="tag1_repo">
                          {tag.name}
                        </div>
                      ))
                    ) : (
                      <div className="tag1_repo">No Tag</div>
                    )}
                  </div>
                  <div className="upl_date">
                    <span className="date">{new Date(repo.date).toLocaleDateString()}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
