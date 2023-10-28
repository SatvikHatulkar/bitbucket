// import React from 'react'
// import "./ChangePass.css"
// import { useNavigate } from 'react-router-dom'
// import { toast } from 'react-toastify';


// const ChangePass = ({user}) => {
//     const navigate = useNavigate();

//     const changePass = ()=>{
//         toast("Password Changed Successfully!")
//     }
//     const back = ()=>{
//         navigate("/editprofile");
//     }

//     return (
//         <div className='ChangePass'>
// <div className="sectionDiv">
//     <div className="sec_name">Change Password</div>
//     <form className="changePassForm">
//                     <div className="inputDiv">
//                         <label htmlFor="" className="labelText">Current Password:</label>
//                         <input type="password" name='currentPassword' placeholder='Current Password...' className="input_text" />
//                     </div>
//                     <div className="inputDiv">
//                         <label htmlFor="" className="labelText">New Password:</label>
//                         <input type="password" name='newPassword' placeholder='New Password...' className="input_text" />
//                     </div>
//                     <button onClick={changePass} className="ChangeBTN">Change Password</button>
//         </form>
//         <div className="backDiv">
//             <button onClick={back} className="backBTN">Back</button>
//         </div>
//     </div>
// </div>
//     )
// }

// export default ChangePass


import React, { useState } from 'react';
import axios from 'axios';
import "./ChangePass.css";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const ChangePass = ({ user }) => {
    const navigate = useNavigate();
    const [passwords, setPasswords] = useState({
        currentPassword: '',
        newPassword: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPasswords(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const changePass = async () => {
        try {
            const response = await axios.put(
                `${import.meta.env.VITE_BACKENDURL}/api/user/changePassword/${user._id}`,
                {
                    CurrentPassword: passwords.currentPassword,
                    newPassword: passwords.newPassword
                },
                {
                    headers: {
                        'authToken': localStorage.getItem('authToken') // Assuming you store the token in localStorage
                    }
                }
            );
        //    console.log(response.data)
            if (response.data.success) {
                toast("Password Changed Successfully!");
            } else {
                toast(`${response.data.message} Or \n Incorrect Password!`);
                // toast();
            }
        } catch (error) {
            // console.error(error);
            toast("Error changing password Or Incorrect Password. Please try again later");
        }
    }

    const back = () => {
        navigate("/editprofile");
    }

    return (
        <div className='ChangePass'>
            <div className="sectionDiv">
                <div className="sec_name">Change Password</div>
                <div className="changePassForm">
                    <div className="inputDiv">
                        <label htmlFor="" className="labelText">Current Password:</label>
                        <input
                            type="password"
                            name='currentPassword'
                            placeholder='Current Password...'
                            className="input_text"
                            value={passwords.currentPassword}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="inputDiv">
                        <label htmlFor="" className="labelText">New Password:</label>
                        <input
                            type="password"
                            name='newPassword'
                            placeholder='New Password...'
                            className="input_text"
                            value={passwords.newPassword}
                            onChange={handleInputChange}
                        />
                    </div>
                    <button onClick={changePass} className="ChangeBTN">Change Password</button>
                </div>
                <div className="backDiv">
                    <button onClick={back} className="backBTN">Back</button>
                </div>
            </div>
        </div>
    )
}

export default ChangePass;
