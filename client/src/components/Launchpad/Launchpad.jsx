import React, { useState } from 'react'
import "./Launchpad.css"
import L1 from "../../assets/launchpad1.jpg"
import L2 from "../../assets/launchpad2.jpg"
import L3 from "../../assets/launchpad3.jpg"
import L4 from "../../assets/launchpad4.jpg"
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios';

const Launchpad = () => {
  const [repositoryName, setRepositoryName] = useState('');
  const [folderName, setFolderName] = useState('');
  const [fileName, setFileName] = useState('');
  const [tagName, setTagName] = useState('');
  const [code, setCode] = useState('');
  let nav = useNavigate();

  const handleSubmit = async () => {
    let token = localStorage.getItem("authToken")
    if (!token) {
      toast("Redirecting to login....");
      nav("/login");
    }
    else {

      try {
        const response = await axios.post(`${import.meta.env.VITE_BACKENDURL}/user/createrepo`, {
          repositoryName: repositoryName,
          folderName: folderName,
          fileName: fileName,
          Code: code,
          tagName: tagName
        }, {
          headers: {
            'authToken': localStorage.getItem('authToken') // Assuming you store the token in localStorage
          }
        });
        console.log(response)
        // console.log('Repository created successfully:', response.data);
        toast("Repository Created Successfully!")
        setRepositoryName('');
        setFolderName('');
        setFileName('');
        setTagName('');
        setCode('');
        // Optionally, you can fetch repositories again after creating a new one to update the list
      } catch (error) {
        console.error('Error creating repository:', error);
        toast("Something wnt wrong")
        // Handle error
      }
    }
  };


  return (
    <>
      <div className="launchpad">
        <div className="name_launchpad">LAUNCHPAD</div>
        <div className="launchpad_sides">
            <div className="img_section_launchpad">
              <div className="img_section">
                <img src={L1} alt="" className="img_launchpad" />
                <img src={L2} alt="" className="img_launchpad" />
              </div>
              <div className="img_section">
                <img src={L3} alt="" className="img_launchpad" />
                <img src={L4} alt="" className="img_launchpad" />
              </div>
            </div>
          <div className="lauCol">
            <div className="launchpad_form">
              <div className="inputs_name_tags">
                <input required type="text"
                  name='name'
                  placeholder='Repository Name'
                  className="repo_name"
                  value={repositoryName}
                  onChange={(e) => setRepositoryName(e.target.value)} />
                <input required type="text"
                  name='folder'
                  placeholder='Repository Folder'
                  className="repo_name"
                  value={folderName}
                  onChange={(e) => setFolderName(e.target.value)} />
                <input required type="text"
                  name='file'
                  placeholder='Repository File'
                  className="repo_name"
                  value={fileName}
                  onChange={(e) => setFileName(e.target.value)} />
                <input required type="text"
                  name='tags'
                  placeholder='Repository Tags'
                  className="repo_name"
                  value={tagName}
                  onChange={(e) => setTagName(e.target.value)} />
              </div>
              <textarea required
                name="code"
                placeholder="Code Starts From Here...."
                className="code_area"
                cols="20"
                rows="25"
                value={code}
                onChange={(e) => setCode(e.target.value)}
              ></textarea>
            </div>
            <div className="button_submit">
              <button className="launchpad_btn" onClick={handleSubmit}>Submit</button>
            </div>

          </div>
        </div>
      </div>
    </>
  )
}

export default Launchpad