const  { Router } = require("express");
const router = Router();
// const bannUser = require("./bannUser");
const banningAndPremium = require("./admin/");
const updateUser = require("./public");

router.use("/", updateUser, banningAndPremium );

module.exports = router
