const  { Router } = require("express");
const router = Router();
// const bannUser = require("./bannUser");
const handleUserBanning = require("./admin");
const updateUser = require("./public");

router.use("/", updateUser, handleUserBanning );

module.exports = router