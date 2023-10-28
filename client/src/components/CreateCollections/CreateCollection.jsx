import React, { useEffect, useState } from 'react'
import "./CreateCollection.css"
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

const CreateCollection = () => {
    let navigate = useNavigate();
    let location = useLocation();
    // let { repository } = location.state
    let { index } = location.state
    const [activeFolder, setActiveFolder] = useState(null);
    const [activeFolderIndex, setActiveFolderIndex] = useState(null);
    // const [activeFile, setActiveFile] = useState(null);
    // const [activeFileIndex, setActiveFileIndex] = useState(null);
    const [type, setType] = useState("Folder");
    const [repo, setRepo] = useState(null);
    const [dropFolder, setDropFolder] = useState(false)
    const [dropFile, setDropFile] = useState(false)
    const [slider2Visible, setSlider2Visible] = useState([]);
    const [folderN, setFolderN] = useState("");
    const [fileN, setFileN] = useState("");


    useEffect(() => {
        // Set repository data from location.state when component mounts
        if (location.state) {
            let { repository } = location.state;
            setRepo(repository.repo);
        }
    }, [location.state]);

    useEffect(() => {
        if (repo && repo.folder) {
            // If repo is not null and has a 'folder' property, initialize slider2Visible state
            setSlider2Visible(Array(repo.folder.length).fill(false));
        }
    }, [repo]);

    // const handleInputChange = (e) => {
    //     const { name, value } = e.target;
    //     setFormData({ ...formData, [name]: value });
    //     console.log(formData)
    // };

    const toggleSlider2 = (folderIndex) => {
        setSlider2Visible((prevVisible) => {
            const newSlider2Visible = [...prevVisible];
            newSlider2Visible[folderIndex] = !newSlider2Visible[folderIndex];
            return newSlider2Visible;
        });
    };;

    const setFolder = () => {
        setType("Folder")
    }

    const setFile = () => {
        setType("File")
    }


    const save = async () => {
        if (type === "File") {
            try {
                const response = await axios.put(`${import.meta.env.VITE_BACKENDURL}/user/addfile/${repo._id}`, {
                    folderName: folderN,
                    fileName: fileN,
                    folderIndex: activeFolderIndex,
                    Code: "No Code"
                }, {
                    headers: {
                        "authToken": localStorage.getItem('authToken'),
                        "Content-Type": "application/json"
                    },
                });

                if (response.status === 200) {
                    // Registration was successful, you can redirect or show a success message
                    toast("Successfully Created New File")
                } else {
                    // Handle other responses (e.g., validation errors) here
                    toast(response.data.message)
                    console.error('Registration error', response.data.message);
                }
            } catch (error) {
                toast(error.message);
                console.error('Registration error', error.message);
            }
        }
        else if (type === "Folder") {
            try {
                const response = await axios.put(`${import.meta.env.VITE_BACKENDURL}/user/addfolder/${repo._id}`, {
                    folderName: folderN,
                }, {
                    headers: {
                        "authToken": localStorage.getItem('authToken'),
                        "Content-Type": "application/json"
                    },
                });

                if (response.status === 200) {
                    // Registration was successful, you can redirect or show a success message
                    toast("Successfully Created New Folder")
                } else {
                    // Handle other responses (e.g., validation errors) here
                    toast(response.data.message)
                    console.error('Registration error', response.data.message);
                }
            } catch (error) {
                toast(error.message);
                console.error('Registration error', error.message);
            }
        }
        else {

        }
        // console.log("Saved")
    }
    const back = () => {
        navigate("/user/createrepo")
    }

    const handledropFolder = () => {
        setDropFolder(!dropFolder);
        setDropFile(false);
    }

    const handleFolderEdit = (folder, index1) => () => {
        setActiveFolder(folder);
        setActiveFolderIndex(index1);
        setType("Folder");
    };

    const handleFileEdit = (folder, index1) => () => {
        setActiveFolder(folder);
        setActiveFolderIndex(index1);
        setType("File");
    };

    // const repository = state ? state.repository : null;
    // console.log(location.state)
    // console.log(typeof (repository)) //object
    // console.log(repository.repo) //object
    // console.log(repo)
    // const index = state ? state.index : null;
    // console.log(index)


    return (
        <>
            <div className="CreateCollection">
                <div className="repores">
                    {

                    }
                    <div className="Repository">Repository</div>
                    <div className="repotory">
                        <div className="secBox">
                            <div></div>
                            <span className="reposName">{repo === null ? "No Repository" : repo.repository}</span>
                            <div className="optionsBox">
                                <i className={`fa-solid fa-caret-down dropFolder`}
                                    onClick={handledropFolder} style={{ color: '#ffffff' }} />
                            </div>
                        </div>
                        {repo === null ? (
                            <div className="infoDoc"></div>
                        ) : (
                            repo && repo.folder ? (
                                repo.folder.map((folder, index1) => (
                                    <div key={index1} className="infoDoc">
                                        <div onClick={handleFolderEdit(folder, index1)} className={dropFolder ? "secBox activate extFOL" : "secBox ld extFOL"}>
                                            &#8627;
                                            <span className="folsName">{folder.name}</span>
                                            <div className="optionsBox">
                                                <i className={`fa-solid fa-caret-down dropFile`}
                                                    onClick={() => toggleSlider2(index1)} style={{ color: '#ffffff' }} />
                                            </div>
                                        </div>
                                        {folder.file ? (
                                            folder.file.map((file, index2) => {
                                                return (
                                                    repo !== null ? (

                                                        <div key={index2} onClick={handleFileEdit(folder, index1)} className={slider2Visible[index1] && dropFolder ? "secBox activate changesExtras" : "secBox ld changesExtras"}>
                                                            &#8627;
                                                            <span className="filsName">{file.name}</span>
                                                            <div className="optionsBox">
                                                                {/* Additional options */}
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <div className="infoDox">No files found</div>
                                                    )
                                                );
                                            })
                                        ) : (
                                            <div className="infoDox">No files found</div>
                                        )
                                        }
                                    </div>
                                ))
                            ) : (
                                <div className="infoDox">No folders found</div>
                            )

                        )
                        }
                    </div>
                </div>
                <div className="lineRep"></div>
                <div className="Collection">
                    <div className="selector">
                        <button className={(type == "Folder") ? `active1 Createfolder` : "Createfolder"} onClick={setFolder}>Create Folder</button>
                        <button className={(type == "File") ? `active1 Createfile` : "Createfile"} onClick={setFile}>Create File</button>
                    </div>
                    {(type === "Folder") ? (
                        <div className="Editor">
                            <span className="repositoryName1">{repo !== null ? `${repo.repository}` : `Malware`}</span>
                            <label htmlFor="" className='Label'>Folder Name:</label>
                            <input
                                type="text"
                                name="folderName"
                                placeholder='Enter Folder Name...'
                                className="inputName"
                                value={folderN}
                                onChange={(e)=>setFolderN(e.target.value)} />
                        </div>
                    ) : (
                        <div className="Editor">
                            <span className="repositoryName2">{(repo && activeFolder !== null) ? (`${repo.repository}/${activeFolder.name}`) : ('Repository/Folder')}</span>
                            <label htmlFor="" className='Label'>File Name:</label>
                            <input
                                type="text"
                                name="fileName"
                                placeholder='Enter File Name...'
                                className="inputName"
                                value={fileN}
                                onChange={(e)=>setFileN(e.target.value)} />
                        </div>
                    )
                    }
                    <div className="CCbtns">
                        <button className="saveBtn" onClick={back}>Back</button>
                        <button className="saveBtn" onClick={save}>Save</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CreateCollection;