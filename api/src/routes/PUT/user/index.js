const  { Router } = require("express");
const router = Router();
// const bannUser = require("./bannUser");
const disableUser = require("./disableUser");
const updateUser = require("./updateUser");

router.use("/", updateUser, disableUser );

module.exports = router
