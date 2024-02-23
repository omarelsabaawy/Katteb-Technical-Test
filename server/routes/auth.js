const express = require("express");
const { login, register, getAllUsers, logOut, } = require("../controllers/user");
const authenticateUser = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.post("/logout", authenticateUser, logOut);
router.get("/users", authenticateUser, getAllUsers);

module.exports = router;
