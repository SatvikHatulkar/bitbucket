import React, { useState, useEffect } from 'react';
import "./FetchUserRepo.css";
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const FetchUserRepo = ({ user }) => {
  let navigation = useNavigate();
  const [repository, setRepository] = useState([]);
  const [editedCode, setEditedCode] = useState("");
  const [clickedRepo, setClickedRepo] = useState('None')
  const [clickedFol, setClickedFol] = useState({ folInfo: "None", folIndex: "None" })
  const [clickedFile, setClickedFile] = useState({ fileInfo: "None", fileIndex: "None" })
  const [editUse, setEditUse] = useState("None");
  const [code, setCode] = useState("Not Saved!");
  const [sliderVisible, setSliderVisible] = useState(Array(repository.length).fill(false));
  const [slider2Visible, setSlider2Visible] = useState(repository.map(repo => Array(repo.folder.length).fill(false)));
  const [oprionBoxVisibility, setOprionBoxVisibility] = useState(new Array(repository.length).fill(false));
  const [oprionBox1Visibility, setOprionBox1Visibility] = useState({});
  const [oprionBox2Visibility, setOprionBox2Visibility] = useState({});
  const [renameRepository, setRenameRepository] = useState(Array(repository.length).fill(false));
  const [renameFolder, setRenameFolder] = useState(repository.map(repo => new Array(repo.folder.length).fill(false)))
  // const [renameFile, setRenameFile] = useState("")
  const [activeFileEdit, setActiveFileEdit] = useState(null);

  const [vis1, setVis1] = useState(false);
  const [vis2, setVis2] = useState(false);
  const [vis3, setVis3] = useState(false);
  const [editedRepositoryName, setEditedRepositoryName] = useState("")
  // const [editedFolderName, setEditedFolderName] = useState("")

  const toggleSlider = (index) => {
    const newSliderVisible = [...sliderVisible];
    newSliderVisible[index] = !newSliderVisible[index];
    setSliderVisible(newSliderVisible);
  };

  const toggleSlider2 = (repoIndex, fileIndex) => {
    const newSlider2Visible = [...slider2Visible];
    newSlider2Visible[repoIndex][fileIndex] = !newSlider2Visible[repoIndex][fileIndex];
    setSlider2Visible(newSlider2Visible);
  };

  const handleRepositoryClick = (repoInfo) => {
    setClickedRepo(repoInfo)
    setEditUse("no")
    // console.log("Repository Clicked:", clickedRepo);
  };

  const handleFolderClick = (folInfo, folIndex) => {
    // Update folder name in the state or use it as needed
    setClickedFol({ folInfo, folIndex });
    setEditUse("no")
    // console.log("Folder Clicked:", folInfo, folIndex);
  };

  const handleFileClick = (fileInfo, fileIndex) => {
    // Update folder name in the state or use it as needed
    setClickedFile({ fileInfo, fileIndex });
    setEditUse("no")
    // console.log("Folder Clicked:", folInfo, folIndex);
  };

  const handleClickBack = () => {
    navigation("/");
  }

  const handleDropOptionClick = (index) => {
    const newVisibility = [...oprionBoxVisibility];
    newVisibility[index] = !newVisibility[index];
    setOprionBoxVisibility(newVisibility);
    setVis1(!vis1);
  };

  const handleDropOptionClick1 = (index1, index2) => {
    setOprionBox1Visibility(prevState => ({
      ...prevState,
      [index1]: {
        ...prevState[index1],
        [index2]: !prevState[index1]?.[index2] || false
      }
    }));
  };

  const handleDropOptionClick2 = (index1, index2, index3) => {
    setOprionBox2Visibility(prevState => ({
      ...prevState,
      [index1]: {
        ...prevState[index1],
        [index2]: {
          ...prevState[index1]?.[index2],
          [index3]: !prevState[index1]?.[index2]?.[index3] || false
        }
      }
    }));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const authToken = localStorage.getItem("authToken");
        const response = await axios.get(`${import.meta.env.VITE_BACKENDURL}/user/allrepos`, {
          headers: {
            "authToken": authToken,
          },
        });

        const repositories = response.data;

        // Initialize renameFolder state based on the fetched repositories
        const initialRenameFolder = repositories.map(repo => (
          repo ? Array(repo.folder.length).fill(false) : []
        ));
        setRenameFolder(initialRenameFolder);
        // ... rest of your code ...
      } catch (error) {
        console.error('Error fetching repositories:', error);
      }
    };

    fetchData();
  }, []);
  

// Inside your useEffect where you fetch repositories data
// useEffect(() => {
//   const fetchData = async () => {
//     try {
//       const authToken = localStorage.getItem("authToken");
//       const response = await axios.get(`${import.meta.env.VITE_BACKENDURL}/user/allrepos`, {
//         headers: {
//           "authToken": authToken,
//         },
//       });

//       const repositories = response.data;
      
//       // Initialize renameFile state based on the fetched repositories
//       const initialRenameFile = repositories.map(repo =>
//         repo.folder.map(folder =>
//           folder.file.map(() => false)
//         )
//       );
//       setRenameFile(initialRenameFile);

//       // ... rest of your code ...
//     } catch (error) {
//       console.error('Error fetching repositories:', error);
//     }
//   };

//   fetchData();
// }, []);


  const handleClickSave = async () => {
    try {
      if (clickedFol.folIndex !== "None" && clickedRepo !== "None" && clickedFile.fileIndex !== "None" && clickedFol.folIndex !== "None" && clickedRepo !== "None" && clickedRepo.folder[clickedFol.folIndex] !== undefined && clickedRepo.folder[clickedFol.folIndex].file[clickedFile.fileIndex] !== undefined) {
        if (clickedRepo.folder[clickedFol.folIndex].name === clickedFol.folInfo.name && clickedRepo.folder[clickedFol.folIndex].file[clickedFile.fileIndex].name === clickedFile.fileInfo.name) {
          const authToken = localStorage.getItem("authToken");
          const { _id } = clickedRepo; // Get the repository ID

          const response = await axios.put(
            `${import.meta.env.VITE_BACKENDURL}/user/updaterepo/${_id}`,
            {
              folderIndex: clickedFol.folIndex,
              fileIndex: clickedFile.fileIndex,
              Code: editedCode, // Send the updated code
            },
            {
              headers: {
                authToken,
              },
            }
          );

          // Handle the response if needed
          // console.log("Code saved successfully:", response.data);
          toast("Code saved successfully!");
          setCode("Saved!");
          setEditUse("None")
          location.reload() 
        } else {
          setEditUse("no")
          toast("Please Select Correct Folder Or File Of The Repository")
        }
      } else {
        setEditUse("no")
        toast("Please Select Folder Or File Or Repository")
      }
    } catch (error) {
      console.error("Error saving code:", error);
      // Handle the error
    }
  };

  const edit = () => {
    if (clickedFol.folIndex !== "None" && clickedRepo !== "None" && clickedFile.fileIndex !== "None" && clickedFol.folIndex !== "None" && clickedRepo !== "None" && clickedRepo.folder[clickedFol.folIndex] !== undefined && clickedRepo.folder[clickedFol.folIndex].file[clickedFile.fileIndex] !== undefined) {
      if (clickedRepo.folder[clickedFol.folIndex].name === clickedFol.folInfo.name && clickedRepo.folder[clickedFol.folIndex].file[clickedFile.fileIndex].name === clickedFile.fileInfo.name) {
        setEditUse("yes")
      } else {
        setEditUse("no")
        toast("Please Select Correct Folder Or File Of The Repository")
      }
    } else {
      setEditUse("no")
      toast("Please Select Folder Or File Or Repository")
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const authToken = localStorage.getItem("authToken");
        const response = await axios.get(`${import.meta.env.VITE_BACKENDURL}/user/allrepos`, {
          headers: {
            "authToken": authToken,
          },
        });
        let repositories = response.data;
        // Initialize slider2Visible based on the number of repositories and folders
        const initialSlider2Visible = repositories.map(repo => Array(repo.folder.length).fill(false));
        setSlider2Visible(initialSlider2Visible);

        // Update the repository state
        setRepository(response.data);
        setEditedRepositoryName(response.data);
        // setEditedFolderName(response.data);

      } catch (error) {
        console.error('Error fetching repositories:', error);
      }
    };

    fetchData();
  }, []);


  const handleDeleteRepository = async (repositoryId) => {
    try {
      const authToken = localStorage.getItem("authToken");
      // console.log(repositoryId)
      const response = await axios.delete(
        `${import.meta.env.VITE_BACKENDURL}/user/repositories/${repositoryId}`,
        {
          headers: {
            authToken,
          },
        }
      );

      // Handle the response as needed
      
      toast("Repository has been deleted successfully!")
    } catch (error) {
      console.error("Error deleting repository:", error);
      // Handle the error
    }
  };

  const handleDeleteFolder = async (repositoryId, folderId) => {
    try {
      const authToken = localStorage.getItem("authToken");
      // console.log(repositoryId, folderId)
      const response = await axios.delete(
        `${import.meta.env.VITE_BACKENDURL}/user/repositories/${repositoryId}/folders/${folderId}`,
        {
          headers: {
            authToken,
          },
        }
      );

      // Handle the response as needed
      // console.log("Repository deleted successfully:", response.data);
      
      toast("Folder has been deleted successfully!")
    } catch (error) {
      console.error("Error deleting repository:", error);
      // Handle the error
    }
  };

  const handleDeleteFile = async (repositoryId, folderId, fileId) => {
    try {
      const authToken = localStorage.getItem("authToken");
      // console.log(repositoryId, folderId, fileId)
      const response = await axios.delete(
        `${import.meta.env.VITE_BACKENDURL}/user/repositories/${repositoryId}/folders/${folderId}/files/${fileId}`,
        {
          headers: {
            authToken,
          },
        }
      );

      // Handle the response as needed
      // console.log("Repository deleted successfully:", response.data);
      
      toast("File has been deleted successfully!")
    } catch (error) {
      console.error("Error deleting repository:", error);
      // Handle the error
    }
  };

  const handleRename = (index) => {
    const newRename = [...renameRepository];
    newRename[index] = !newRename[index];
    setRenameRepository(newRename);
  }

  const handleFolderRename = (index1, index2) => {
    const newRename = [...renameFolder];
    newRename[index1][index2] = !newRename[index1][index2];
    setRenameFolder(newRename);
  }

  // const handleFileRename = (index1, index2, index3) => {
  //   const newRename = [...renameFile];
  //   newRename[index1][index2][index3] = !newRename[index1][index2][index3];
  //   setRenameFile(newRename);
  // }

  // const handleFileRename = (repoIndex, folderIndex, fileIndex) => {
  //   setRenameFile(prevState => {
  //     const newState = [...prevState];
  //     newState[repoIndex][folderIndex][fileIndex] = !newState[repoIndex][folderIndex][fileIndex];
  //     return newState;
  //   });
  // };
  

  const handleRenameSave = async (index) => {
    try {
      const authToken = localStorage.getItem("authToken");
      const { _id } = repository[index]; // Get the repository ID
      const updatedRepositoryName = editedRepositoryName[index].repository;

      const response = await axios.put(
        `${import.meta.env.VITE_BACKENDURL}/user/updaterepo/${_id}`,
        {
          repositoryName: updatedRepositoryName, // Send the updated repository name
        },
        {
          headers: {
            authToken,
          },
        }
        
      );

      // Handle the response if needed
      // Optionally, you can set the state or display a success message here
      
      // Close the input field for renaming after renaming is successful
      const newRename = [...renameRepository];
      newRename[index] = false;
      setRenameRepository(newRename);
      
      toast("Repository renamed successfully:");
    } catch (error) {
      console.error("Error renaming repository:", error);
      // Handle the error, display an error message, or revert the changes if needed
    }
  };


  const handleFolderRenameSave = async (repoIndex, folderIndex) => {
    try {
      const authToken = localStorage.getItem("authToken");
      const { _id } = repository[repoIndex]; // Get the repository ID
      const updatedFolderName = editedRepositoryName[repoIndex].folder[folderIndex].name;

      const response = await axios.put(
        `${import.meta.env.VITE_BACKENDURL}/user/updaterepo/${_id}`,
        {
          folderIndex: folderIndex,
          folderName: updatedFolderName, // Send the updated folder name
        },
        {
          headers: {
            authToken,
          },
        }
      );

      // Handle the response if needed
      // Optionally, you can set the state or display a success message here
      
      // Close the input field for renaming after renaming is successful
      const newRename = [...renameFolder];
      // console.log(newRename)
      newRename[folderIndex] = [false];
      setRenameFolder(newRename);
      
      toast("Folder renamed successfully:");
    } catch (error) {
      console.error("Error renaming folder:", error);
      // Handle the error, display an error message, or revert the changes if needed
    }
  };



  const handleFileRename = (repoIndex, folderIndex, fileIndex) => {
    setActiveFileEdit({ repoIndex, folderIndex, fileIndex });
  };
  
  const handleFileNameChange = (repoIndex, folderIndex, fileIndex, newName) => {
    setEditedRepositoryName((prevState) => {
      const newState = [...prevState];
      newState[repoIndex].folder[folderIndex].file[fileIndex].name = newName;
      return newState;
    });
  };
  const handleFileRenameSave = async (repoIndex, folderIndex, fileIndex) => {
    try {
      const authToken = localStorage.getItem("authToken");
      const { _id } = repository[repoIndex];
      const updatedFileName = editedRepositoryName[repoIndex].folder[folderIndex].file[fileIndex].name;
  
      const response = await axios.put(
        `${import.meta.env.VITE_BACKENDURL}/user/updaterepo/${_id}`,
        {
          folderIndex: folderIndex,
          fileIndex: fileIndex,
          fileName: updatedFileName, // Send the updated file name
        },
        {
          headers: {
            authToken,
          },
        }
      );
  
      // Handle the response if needed
      
      toast("File renamed successfully!");
      // Optionally, you can update the local state or perform other actions after renaming
    } catch (error) {
      console.error("Error renaming file:", error);
      // Handle the error, display an error message, or revert the changes if needed
    }
  };
  
  // Inside your component...
  // console.log(renameRepository)
  // console.log(renameFolder)

  return (
    <div className="fetchUserRepo">
      <div className="repoExplorer">
        <span className="explorerName">Repository Explorer</span>
        <div className="exploreSection">
          <div className="reposection">
            {
              (repository !== null) ? (
                repository && repository.map((repo, index1) => (
                  <div key={index1} className="repositories" onClick={() => handleRepositoryClick(repo)}>
                    <div className="expBox">
                      {!renameRepository[index1] ? (
                        <div className="repositoryName">{repo.repository}</div>
                      ) : (
                        <input
                          type="text"
                          value={editedRepositoryName[index1].repository}
                          className='itemsRename'
                          onChange={(e) => setEditedRepositoryName(prevState => {
                            const newState = [...prevState];
                            newState[index1].repository = e.target.value;
                            return newState;
                          })}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              handleRenameSave(index1);
                            }
                          }}
                          autoFocus // Optional: Autofocus the input field for a better user experience
                        />
                      )}
                      {/* <div className="repositoryName">{repo.repository}</div> */}
                      <span className="options">
                        <i className={`fa-solid fa-caret-down ${sliderVisible[index1] ? 'active' : ''} dropFolder`}
                          style={{ color: '#ffffff' }}
                          onClick={() => toggleSlider(index1)} />
                        <div className="opt">
                          <i className={`fa-solid fa-ellipsis ${sliderVisible[index1] ? 'active' : 'ld'} dropOption`}
                            style={{ color: '#ffffff' }}
                            onClick={() => handleDropOptionClick(index1)} // Pass the index of the clicked dropOption
                          />
                          <div className={`${oprionBoxVisibility[index1] ? "oprionBox block" : ""}`}>
                            <span className={` ${oprionBoxVisibility[index1] ? "renameTool1  block" : "renameTool1"}`} onClick={() => handleRename(index1)}>Rename</span>
                            <span className={` ${oprionBoxVisibility[index1] ? "DeleteTool1  block" : "DeleteTool1"}`} onClick={() => handleDeleteRepository(repo._id)} >Delete</span>
                          </div>
                        </div>
                      </span>
                    </div>
                    <div className={sliderVisible[index1] ? 'repositorysSlider1 active' : 'repositorysSlider1'}>
                      <div className="fixer">
                        {
                          (repo.folder !== null) ? (

                            repo.folder.map((fol, index2) => (
                              <div key={index2} className="onlyBOx">
                                <div className="repoF1" onClick={() => handleFolderClick(fol, index2)}>
                                  &#8627;
                                  {renameFolder && renameFolder[index1][index2] ? (
                                    <input
                                      type="text"
                                      className="itemsRename"
                                      value={editedRepositoryName[index1].folder[index2].name}
                                      onChange={//(e)=>//function to handle onChange
                                        (e) => setEditedRepositoryName(prevState => {
                                          const newState = [...prevState];
                                          newState[index1].folder[index2].name = e.target.value;
                                          return newState;
                                        })}
                                      onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                          //function to save the change value (handleFolderRenameSave)
                                          handleFolderRenameSave(index1, index2);
                                        }
                                      }}
                                      autoFocus
                                    />
                                  ) : (
                                    <span className="folName">{fol.name}</span>
                                  )
                                  }
                                  <span className="options">
                                    <i key={index2}
                                      className={`fa-solid fa-caret-down ${sliderVisible[index1] ? 'active' : 'ld'} dorpFile`}
                                      style={{ color: '#ffffff' }}
                                      onClick={() => toggleSlider2(index1, index2)} // Pass both repoIndex and fileIndex
                                    />
                                    <div className="opt">
                                      <i key={index2}
                                        className={`fa-solid fa-ellipsis ${sliderVisible[index1] ? 'active' : 'ld'} dropOption1`}
                                        style={{ color: '#ffffff' }}
                                        onClick={() => handleDropOptionClick1(index1, index2)} // Pass the index of the clicked dropOption1
                                      />
                                      <div className={`${oprionBox1Visibility[index1]?.[index2] ? "oprionBox1 block" : ""}`}>
                                        <span className={` ${oprionBox1Visibility[index1]?.[index2] ? "renameTool2  block" : "renameTool2"}`} onClick={() => handleFolderRename(index1, index2)}>Rename</span>
                                        <span className={` ${oprionBox1Visibility[index1]?.[index2] ? "DeleteTool2  block" : "DeleteTool2"}`} onClick={() => handleDeleteFolder(repo._id, fol._id)} >Delete</span>
                                      </div>
                                    </div>
                                  </span>
                                </div>
                                <div className={sliderVisible[index1] && slider2Visible[index1][index2] ? 'repositorysSlider2 active' : 'repositorysSlider2'}>
                                  <div className="fixer1">
                                    {
                                      (fol.file !== null) ? (

                                        fol.file.map((file, index3) => (
                                          <div key={index3} className="repoF2" onClick={() => handleFileClick(file, index3)}>
                                            &#x21B3;
                                            {
                                            (activeFileEdit && activeFileEdit.repoIndex === index1 && activeFileEdit.folderIndex === index2 && activeFileEdit.fileIndex === index3) ? (
                                              <input
                                                type="text"
                                                className='itemsRename'
                                                value={editedRepositoryName[index1].folder[index2].file[index3].name}
                                                onChange={(e) => handleFileNameChange(index1, index2, index3, e.target.value)}
                                                onKeyDown={(e) => {
                                                  if (e.key === 'Enter') {
                                                    handleFileRenameSave(index1, index2, index3);
                                                    setActiveFileEdit(null); // Reset activeFileEdit state after renaming
                                                  }
                                                }}
                                                autoFocus // Optional: Autofocus the input field for a better user experience
                                              />
                                            ) : (
                                              <span className="filName">{file.name}</span>
                                            )
                                            }
                                            <div className="opt">
                                              <i className={`fa-solid fa-ellipsis ${slider2Visible ? 'active' : 'mld'} dropOption2`}
                                                style={{ color: '#ffffff' }}
                                                onClick={() => handleDropOptionClick2(index1, index2, index3)} />
                                              <div className={` ${oprionBox2Visibility[index1]?.[index2]?.[index3] ? "oprionBox2 block" : ""}`}>
                                                <span className={` ${oprionBox2Visibility[index1]?.[index2]?.[index3] ? "renameTool3  block" : "renameTool3"}`} onClick={() => handleFileRename(index1, index2, index3) }>Rename</span>
                                                <span className={` ${oprionBox2Visibility[index1]?.[index2]?.[index3] ? "DeleteTool3  block" : "DeleteTool3"}`} onClick={() => handleDeleteFile(repo._id, fol._id, file._id)} >Delete</span>
                                              </div>
                                            </div>
                                          </div>
                                        ))
                                      ) : (
                                        <span></span>
                                      )
                                    }
                                  </div>
                                </div>
                              </div>
                            ))
                          ) : (
                            <span></span>
                          )
                        }
                      </div>
                    </div>

                  </div>
                ))
              ) : (
                // {navigation("user/createrepo")}
                <span></span>
              )
            }

          </div>
        </div>
      </div>
      <div className="lineRepo"></div>
      <div className="repoView">
        <div className="fexhedData">
          <div className="dataContainer">
            <div className="rName">{clickedRepo !== "None" ? clickedRepo.repository : "Repository"}</div>
            <div className="foName">{clickedFol.folInfo !== "None" ? clickedFol.folInfo.name : "Folder"}</div>

            <div className="fiName">{clickedFile.fileInfo !== "None" ? clickedFile.fileInfo.name : "File"}</div>
            <div className="codeArea1">
              <div className="options">
                <span className="editBox" onClick={edit}>Edit</span>
              </div>
              <span className="linedivider"></span>
              {(editUse == "yes" && clickedFile !== "None") ? (
                <textarea value={editedCode !== "" ? editedCode : (clickedFile.fileInfo !== "None" ? clickedFile.fileInfo.code : "")}
                  onChange={(e) => setEditedCode(e.target.value)}
                  className="CodeExp"
                />
              ) : (
                <div className="CodeExp">{clickedFile.fileInfo !== "None" ? clickedFile.fileInfo.code : "No Code"}</div>
              )}
            </div>
          </div>
          <div className="btns">
            <button onClick={handleClickBack} className="BackBTN">Back</button>
            <button onClick={handleClickSave} className="saveBTN">Save</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FetchUserRepo;