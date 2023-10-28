const {Router} = require("express")
const fetchRepo = require("../controllers/fetchRepo")
const addRepo = require("../controllers/createRepo")
const updRepo = require("../controllers/updateRepo")
const deleteRepo = require("../controllers/deleteRepo")
const addFolder = require("../controllers/addFolder")
const addTag = require("../controllers/addTags")
const addFile = require("../controllers/addFile")
const fetchAllRepos = require("../controllers/fetchallrepo")

const repo = Router();

repo.get("/allrepos", fetchRepo);
repo.post("/createrepo", addRepo);
repo.put("/updaterepo/:id", updRepo);
repo.delete("/repositories/:repositoryId", deleteRepo);
repo.delete("/repositories/:repositoryId/folders/:folderId", deleteRepo);
repo.delete("/repositories/:repositoryId/folders/:folderId/files/:fileId", deleteRepo);
repo.put("/addfolder/:id", addFolder);
repo.put("/addtag/:id", addTag);
repo.put("/addfile/:id", addFile);
repo.get("/everyrepo", fetchAllRepos);

module.exports = repo;