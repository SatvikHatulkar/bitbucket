// import "./EditProfile.css";
// import React from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import imageUrl from "../../assets/profile.png"

// const EditProfile = ({user}) => {
//     const token = localStorage.getItem("authToken");
//     const navigate = useNavigate();
    // const convertBase64 = (e) => {
    //     if (!token) {
    //         res.status(401).json("Not allowed")
    //         return false;
    //     }
    //     const file = e.target.files[0];
    //     if (file && file.type.startsWith('image/')) {
    //         const reader = new FileReader();
    //         reader.readAsDataURL(file);
    //         reader.onload = () => {
    //             const imageData = reader.result.split(',')[1]; // Extracting base64 data
    //             // Send imageData to the server using Axios
    //             axios.post(`${import.meta.env.VITE_BACKENDURL}/user/uploadImage`, { imageData }, {
    //                 headers: {
    //                     'Content-Type': 'application/json',
    //                     'authToken': token, // Add your authentication token here
    //                 }
    //             })
    //                 .then(response => {
    //                     console.log(response.data); // Handle the response from the server
    //                 })
    //                 .catch(error => {
    //                     console.error('Error:', error);
    //                 });
    //         };
    //         reader.onerror = (error) => {
    //             console.log("Error:", error);
    //         };
    //     } else {
    //         alert("Please select a valid image file.");
    //     }

    // };
// const changePass = () => {
//     if (!token) {
//         res.status(401).json("Not allowed")
//         return false;
//     }
//     navigate("/editprofile/ChangePassword")

// }
//     const back = () => {
//         navigate("../")
//     }

//     return (
//         <>
//             <div className="editProfile">
// <div className="changeFrame">
//     <div className="editBox">
//         <div className="edit_heading">Edit Profile</div>
//         <form className="editForm">
//             {/* <input
//                 type="file"
//                 accept="image/*"
//                 className="imageInput"
//                 onChange={convertBase64}
//             /> */}
//             <div className="imageInput" style={{ backgroundImage: `url(${imageUrl})` }}>
//                 <input
//                     type="file"
//                     accept="image/*"
//                     className="imageInput"
//                     onChange={convertBase64}
//                 />
//             </div>
//         </form>
//     </div>
//     <div className="proTextEdit">
//                         <form className="editForm">
//                             <div className="input_sec">
//                                 <label htmlFor="username" className="label_heading">Username:</label>
//                                 <input type="text" name='username' placeholder="Enter Username Here..." className="input_edit" />
//                             </div>
//                             <div className="input_sec">
//                                 <label htmlFor="skills" className="label_heading">Skills:</label>
//                                 <input type="text" name='skills' placeholder='(skill1, skills2, skills3)...' className="input_edit" />
//                             </div>
//                         </form>
//                         <button className="changeBTN">Save</button>
//         </div>
//     </div>
//     <div className="changePassword">
//         <button onClick={back} className="changePassBTN">Back</button>
//         <button onClick={changePass} className="changePassBTN">Change Password</button>
//     </div>
// </div>
//         </>
//     );
// };

// export default EditProfile;

import "./EditProfile.css";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import imageUrl from "../../assets/profile.png";
import { toast } from 'react-toastify';


const EditProfile = ({ user }) => {
    const [userData, setUserData] = useState({
        username: '',
        skills: ''
    });

    const [loading, setLoading] = useState(true); // Loading state to manage data fetching
    const token = localStorage.getItem("authToken");
    const navigate = useNavigate();
    const convertBase64 = (e) => {
        if (!user) {
            res.status(401).json("Not allowed")
            // return false;
        }
        const file = e.target.files[0];
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                const imageData = reader.result.split(',')[1]; // Extracting base64 data
                // Send imageData to the server using Axios
                axios.post(`${import.meta.env.VITE_BACKENDURL}/user/uploadImage`, { imageData }, {
                    headers: {
                        'Content-Type': 'application/json',
                        'authToken': token, // Add your authentication token here
                    }
                })
                    .then(response => {
                        console.log(response.data); // Handle the response from the server
                    })
                    .catch(error => {
                        console.error('Error:', error);
                    });
            };
            reader.onerror = (error) => {
                console.log("Error:", error);
            };
        } else {
            alert("Please select a valid image file.");
        }

    };

    useEffect(() => {
        if (user) {
            // Fetch user data if user is defined
            axios.get(`${import.meta.env.VITE_BACKENDURL}/api/auth`, {
                headers: {
                    'authToken': token,
                }
            })
                .then(response => {
                    setUserData({
                        username: response.data.username,
                        skills: Array.isArray(response.data.skills)
                            ? response.data.skills.join(', ')  // Join if it's an array
                            : response.data.skills
                    });
                    setLoading(false); // Set loading to false after data is fetched
                })
                .catch(error => {
                    console.error('Error:', error);
                    setLoading(false); // Set loading to false in case of an error
                });
        } else {
            // Handle the case when user is null or undefined.
            // For example, redirect to an error page or display a message to the user.
            setLoading(false); // Set loading to false when user is null or undefined
        }
    }, [token, user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Only make the PUT request if user is not null or undefined
        if (user) {
            axios.put(`${import.meta.env.VITE_BACKENDURL}/api/user/${user._id}`, userData, {
                headers: {
                    'Content-Type': 'application/json',
                    'authToken': token,
                }
            })
            .then(response => {
                toast("Profile Edited")
                // console.log(response.data);
                    // console.clear();
                    // Optionally, you can redirect the user to another page after successful update
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        }
    };

    const changePass = () => {
        if (!user) {
            res.status(401).json("Not allowed")
            return false;
        }
        navigate("/editprofile/ChangePassword")

    }

    const back = () => {
        navigate("/profile");
    };


    // const save =()=>{
    // }

    if (loading) {
        // You can show a loading indicator here while data is being fetched
        return <div>Loading...</div>;
    }

    return (
        <div className="editProfile">
            <div className="changeFrame">
                <div className="editBox">
                    <div className="edit_heading">Edit Profile</div>
                    <form className="editForm">
                        {/* <input
                                type="file"
                                accept="image/*"
                                className="imageInput"
                                onChange={convertBase64}
                            /> */}
                        <div className="imageInput" style={{ backgroundImage: `url(${imageUrl})` }}>
                            <input
                                type="file"
                                accept="image/*"
                                className="imageInput"
                                onChange={convertBase64}
                            />
                        </div>
                    </form>
                </div>
                <div className="proTextEdit">
                    <form className="editForm" onSubmit={handleSubmit}>
                        {/* Input fields for username and skills */}
                        <div className="input_sec">
                            <label htmlFor="username" className="label_heading">Username:</label>
                            <input
                                type="text"
                                name='username'
                                placeholder="Enter Username Here..."
                                className="input_edit"
                                value={userData.username}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="input_sec">
                            <label htmlFor="skills" className="label_heading">Skills:</label>
                            <input
                                type="text"
                                name='skills'
                                placeholder='(skill1, skills2, skills3)...'
                                className="input_edit"
                                value={userData.skills}
                                onChange={handleChange}
                            />
                        </div>
                        <button type="submit"  className="changeBTN">Save</button>
                    </form>
                </div>
            </div>
            <div className="changePassword">
                <button onClick={back} className="changePassBTN">Back</button>
                <button onClick={changePass} className="changePassBTN">Change Password</button>
            </div>
        </div>
    );
};

export default EditProfile;
