const  { Router } = require("express");
const router = Router();
// const bannUser = require("./bannUser");
const admin = require("./admin/");
const public = require("./public");

router.use("/", public, admin );

module.exports = router
