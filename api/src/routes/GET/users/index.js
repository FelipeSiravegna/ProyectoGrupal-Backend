const  { Router } = require("express");
const getUsers=require("./users");
const getUser=require("./user");
const router = Router();


router.use("/", getUsers, getUser);




module.exports = router;
