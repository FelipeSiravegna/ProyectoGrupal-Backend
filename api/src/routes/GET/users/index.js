const  { Router } = require("express");
const getUsers=require("./users");
const getUser=require("./user");
const getBannedUsers = require("./bannedUsers");
const router = Router();


router.use( "/", getUsers, getUser, getBannedUsers );




module.exports = router;
