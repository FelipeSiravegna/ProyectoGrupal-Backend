const { Router } = require("express");
const getUsers = require("./users.js");
const getUserData = require("./user.js");
const getBannedUsers = require("./bannedUsers");
const router = Router();

router.use("/", getUsers, getUserData, getBannedUsers);

module.exports = router;