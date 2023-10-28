const { Router } = require("express");
const signup = require("../controllers/signup");
const login = require("../controllers/login");
const auth = require("../controllers/auth");
const updateUser = require("../controllers/editProfile");
const updatePassword = require("../controllers/editPassword");
const forgetPassword = require("../controllers/forgetPass");
const uploadImage = require("../controllers/uploadImage");

const router = Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/auth", auth);
router.put("/user/:id", updateUser);
router.put("/user/changePassword/:id", updatePassword);
router.post("/user/forgetPassword", forgetPassword);
router.post("/user/uploadImage", uploadImage);

module.exports = router;