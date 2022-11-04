const  { Router } = require("express");
const getUsers=require("./users");
const getUserData=require("./user");
const getBannedUsers = require("./bannedUsers");
const router = Router();


router.use( "/", getUsers, getUserData, getBannedUsers);




module.exports = router;
