import './App.css'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import Learnmore from './components/Learnmore/Learnmore';
import Footer from './components/Footer/Footer';
import Home from './components/Home/Home';
import Login from "./pages/Login"
import Sign from "./pages/Sign"
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, BrowserRouter } from 'react-router-dom';
import Profile from './components/Profile/Profile';
import EditProfile from './components/EditProfile/EditProfile';
import CreateRepo from './components/Repository/Repository';
import NotFound from './pages/NotFound';
import ChangePass from './components/ChangePass/ChangePass';
import FetchUserRepo from './components/FetchUserRepo/FetchUserRepo';
import CreateCollection from './components/CreateCollections/CreateCollection';




function App() {

  const [user, setUser] = useState(null);
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    // Function to fetch user information using the stored JWT token
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("authToken"); // Retrieve the token from local storage
        if (token) {
          const response = await axios.get(`${import.meta.env.VITE_BACKENDURL}/api/auth`, {
            headers: {
              "authToken": token           // Send the token in the request headers
            }
          });
          setUser(response.data); // Set the user state with the fetched user data
          setAuth(response.data.auth);
        }

      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData(); // Call the function when the component mounts
  }, []);
  return (
    <>
      <ToastContainer />
    <BrowserRouter>
      {/* <Router> */}
        <Routes>
          <Route exact path="/" element={<Home user={user} auth={auth}/>} />
          <Route exact path="/learnmore" element={<Learnmore auth={auth}/>} />
          <Route exact path="/login" element={<Login user={user} auth={auth}/>} />
          <Route exact path="/signup" element={<Sign user={user} auth={auth}/>} />
          <Route exact path="/profile" element={<Profile user={user} auth={auth}/>} />
          <Route exact path="/editprofile" element={<EditProfile user={user} auth={auth}/>} />
          <Route exact path="/editprofile/ChangePassword" element={<ChangePass user={user} auth={auth}/>} />
          <Route exact path="/user/createrepo" element={<CreateRepo user={user} auth={auth}/>} />
          <Route exact path="/user/repoexplorer" element={<FetchUserRepo user={user} auth={auth}/>} />
          <Route exact path="/user/createrepo/collection" element={<CreateCollection user={user} auth={auth}/>} />
          <Route path="/404" element={<NotFound/>} />
        </Routes>
        <Footer/>
      {/* </Router> */}
    </BrowserRouter>
    </>
  )
}

export default App



// // App.jsx
// import React, { useEffect, useState } from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import PrivateRoute from './PrivateRoute';
// import Home from './components/Home/Home';
// import Learnmore from './components/Learnmore/Learnmore';
// import Login from "./pages/Login";
// import Sign from "./pages/Sign";
// import Profile from './components/Profile/Profile';
// import EditProfile from './components/EditProfile/EditProfile';
// import CreateRepo from './components/Repository/Repository';
// import NotFound from './pages/NotFound';
// import Footer from './components/Footer/Footer';
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import axios from 'axios';

// function App() {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         const token = localStorage.getItem("authToken");
//         if (token) {
//           const response = await axios.get(`${import.meta.env.VITE_BACKENDURL}/api/auth`, {
//             headers: {
//               "authToken": token
//             }
//           });
//           setUser(response.data);
//         }
//       } catch (error) {
//         console.error("Error fetching user data:", error);
//       }
//     };

//     fetchUserData();
//   }, []);

//   return (
//     <>
//       <ToastContainer />
//       <Router>
//         <Routes>
//           <Route exact path="/" element={<Home username={user} />} />
//           <Route exact path="/login" element={<Login username={user} />} />
//           <Route exact path="/signup" element={<Sign username={user} />} />
//           <Route exact path="/404" element={<NotFound />} />
          
//           {/* Protected routes */}
//           <Route
//             exact path="/learnmore"
//             element={<PrivateRoute element={<Learnmore />} isAuthenticated={user !== null} />}
//           />
//           <Route
//             exact path="/profile"
//             element={<PrivateRoute element={<Profile username={user} />} isAuthenticated={user !== null} />}
//           />
//           <Route
//             exact path="/editprofile"
//             element={<PrivateRoute element={<EditProfile username={user} />} isAuthenticated={user !== null} />}
//           />
//           <Route
//             exact path="/user/createrepo"
//             element={<PrivateRoute element={<CreateRepo username={user} />} isAuthenticated={user !== null} />}
//           />
//         </Routes>
//         <Footer />
//       </Router>
//     </>
//   );
// }

// export default App;

