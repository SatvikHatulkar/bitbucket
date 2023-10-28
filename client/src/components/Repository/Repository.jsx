import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Repository.css';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const Repository = () => {
    const [repositories, setRepositories] = useState([]);
    const [repoName, setRepoName] = useState('');
    const [folderName, setFolderName] = useState('');
    const [fileName, setFileName] = useState('');
    const [tagName, setTagName] = useState('');
    const [code, setCode] = useState('');

    // Fetch user's repositories when the component mounts
    useEffect(() => {
        const fetchRepositories = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKENDURL}/user/allrepos`, {
                    headers: {
                        'authToken': localStorage.getItem('authToken') // Assuming you store the token in localStorage
                    }
                });
                setRepositories(response.data);
            } catch (error) {
                console.error('Error fetching repositories:', error);
                // Handle error
            }
        };

        fetchRepositories();
    }, []); // Empty dependency array ensures the effect runs once after the initial render

    const handleSubmit = async () => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKENDURL}/user/createrepo`, {
                repositoryName: repoName,
                folderName: folderName,
                fileName: fileName,
                Code: code,
                tagName: tagName
            }, {
                headers: {
                    'authToken': localStorage.getItem('authToken') // Assuming you store the token in localStorage
                }
            });
            // console.log('Repository created successfully:', response.data);
            toast("Repository Created Successfully!")
            setRepoName('');
            setFolderName('');
            setFileName('');
            setTagName('');
            setCode('');
            // Optionally, you can fetch repositories again after creating a new one to update the list
        } catch (error) {
            console.error('Error creating repository:', error);
            // Handle error
        }
    };

    return (
        <>
            <div className="repository">
                <div className="repoExplorer">
                    <div className="expTitle">Repositories</div>
                    <div className="repoNames">
                        {repositories.length > 0 ? (
                            repositories.map((repo, index) => (
                                <Link to= "/user/createrepo/collection" 
                                state={{
                                    repository: {repo},
                                    index: index
                                }}
                                
                                className="repoNameHie"
                                key={index}
                                >
                                    {repo.repository} {/* Assuming 'repository' is the property name for repository name */}
                                </Link>
                            ))
                        ) : (
                            <div className="repoNameHie">No repositories found</div>
                        )}
                    </div>
                </div>
                <div className="lineRepo"></div>
                <div className="editorBox">
                    <div className="RepoTitle">Create your Repository</div>
                    <div className="repoBox">
                        <div className="inputForm">
                            <input
                                required
                                type="text"
                                name="name"
                                placeholder="Repository Name"
                                className="repoName"
                                value={repoName}
                                onChange={(e) => setRepoName(e.target.value)}
                            />
                            <input
                                required
                                type="text"
                                name="folder"
                                placeholder="Repository Folder"
                                className="repoName"
                                value={folderName}
                                onChange={(e) => setFolderName(e.target.value)}
                            />
                            <input
                                required
                                type="text"
                                name="file"
                                placeholder="Repository File"
                                className="repoName"
                                value={fileName}
                                onChange={(e) => setFileName(e.target.value)}
                            />
                            <input
                                required
                                type="text"
                                name="tags"
                                placeholder="Repository Tag"
                                className="repoName"
                                value={tagName}
                                onChange={(e) => setTagName(e.target.value)}
                            />
                        </div>
                        <textarea
                            required
                            name="code"
                            placeholder="Code Starts From Here...."
                            className="codeArea"
                            rows="25"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                        ></textarea>
                        <div className="buttonSubmit">
                            <button className="repoBtn" onClick={handleSubmit}>
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Repository;
