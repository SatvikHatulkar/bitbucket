// import React from 'react'
// import profile from "../../assets/profile.png";
// import "./Repo.css";

// const Repo = (props) => {
//   return (
//     <div className='repo'>
//       <div className="section_title">REPOSITORY</div>
//       <div className="repo_row">
//         <div className="container_repo">
//           <div className="profile_title">
//             <div className="profile_repo">
//               <img src={profile} alt="" className="image_profile_repo" />
//               <span className="proflie_username">Username</span>
//             </div>
//             <div className="title_repo">
//               <div className="title_topic">Malware</div>
//               <div className="desc_topic">Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi temporibus debitis aspernatur, eum qui rem quae saepe repellat voluptatem non eaque architecto a dolorem sit eius! Dicta quo illo dolores?</div>
//             </div>
//           </div>
//           <div className="tags_repo">
//             <div className="tag1_repo">Malware Dev</div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Repo


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import profile from '../../assets/profile.png';
// import './Repo.css';

// const Repo = () => {
//     const [repositories, setRepositories] = useState([]);
//     const [user, setUser] = useState([]);

//     useEffect(() => {
//         const fetchRepositories = async () => {
//             try {
//                 const token = localStorage.getItem('authToken');
//                 const response = await axios.get(`${import.meta.env.VITE_BACKENDURL}/user/everyrepo`, {
//                     headers: {
//                         'Content-Type': 'application/json',
//                         'authToken': token,
//                     },
//                 });
//                 setRepositories(response.data.repositories);
//                 setUser(response.data.repoUserArray);
//             } catch (error) {
//                 console.error('Error fetching repositories:', error);
//             }
//         };

//         fetchRepositories();
//     }, []); // Empty dependency array ensures useEffect runs once after initial render

//     const renderTags = (tags) => {
//         if (tags.length === 0) {
//             return <div className="tag_repo">Not Tag</div>;
//         } else {
//             return tags.slice(0, 3).map((tag, index) => (
//                 <div className="tag_repo" key={index}>
//                     {tag}
//                 </div>
//             ));
//         }
//     };

//     return (
//         <div className="repo">
//             {repositories.reduce((rows, repo, index) => {
//                 if (index % 3 === 0) {
//                     rows.push([]);
//                 }
//                 rows[rows.length - 1].push(repo);
//                 return rows;
//             }, []).map((row, rowIndex) => (
//                 <div className="repo_row" key={rowIndex}>
//                     {row.map((repo, index) => (
//                         <div className="container_repo" key={index}>
//                             <div className="profile_title">
//                                 <div className="profile_repo">
//                                     <img src={profile} alt="" className="image_profile_repo" />
//                                     <span className="proflie_username">{user.username}</span>
//                                 </div>
//                                 <div className="title_repo">
//                                     <div className="title_topic">{repo.repository}</div>
//                                     <div className="desc_topic">Repository Description Goes Here</div>
//                                 </div>
//                             </div>
//                             <div className="tags_repo">{renderTags(repo.tags)}</div>
//                         </div>
//                     ))}
//                 </div>
//             ))}
//         </div>
//     );
// };

// export default Repo;



import React, { useState, useEffect } from 'react';
import axios from 'axios';
import profile from '../../assets/profile.png';
import './Repo.css';

const Repo = () => {
    const [repositories, setRepositories] = useState([]);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchRepositories = async () => {
            try {
                const token = localStorage.getItem('authToken');
                const response = await axios.get(`${import.meta.env.VITE_BACKENDURL}/user/everyrepo`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'authToken': token,
                    },
                });
                setRepositories(response.data.repositories);
                setUsers(response.data.repoUserArray);
            } catch (error) {
                console.error('Error fetching repositories:', error);
            }
        };

        fetchRepositories();
    }, []); // Empty dependency array ensures useEffect runs once after initial render

    const renderTags = (tags) => {
        if (tags.length === 0) {
            return <div className="tag_repo">Not Tag</div>;
        } else {
            return tags.map((tag, index) => (
                <div className="tag_repo" key={index}>
                    {tag.name}
                </div>
            ));
        }
    };

    return (
        <div className="repo">
          <div className="section_title">Repository</div>
            <div className="repo_row">
                {repositories.slice(0, 3).map((repo, index) => (
                    <div className="container_repo" key={index}>
                        <div className="profile_title">
                            <div className="profile_repo">
                                <img src={profile} alt="" className="image_profile_repo" />
                                <span className="profile_username">{users[index].username}</span>
                            </div>
                            <div className="title_repo">
                                <div className="title_topic">{repo.repository}</div>
                                <div className="desc_topic">Repository Description Goes Here</div>
                            </div>
                        </div>
                        <div className="tags_repo">{renderTags(repo.tags)}</div>
                    </div>
                ))}
            </div>
            <div className="repo_row">
                {repositories.slice(3, 6).map((repo, index) => (
                    <div className="container_repo" key={index}>
                        <div className="profile_title">
                            <div className="profile_repo">
                                <img src={profile} alt="" className="image_profile_repo" />
                                <span className="profile_username">{users[index + 3].username}</span>
                            </div>
                            <div className="title_repo">
                                <div className="title_topic">{repo.repository}</div>
                                <div className="desc_topic">Repository Description Goes Here</div>
                            </div>
                        </div>
                        <div className="tags_repo">{renderTags(repo.tags)}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Repo;



