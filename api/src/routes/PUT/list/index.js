const { Router } = require("express");
const router = Router();
const public = require("./public");
const admin = require("./admin");

router.use ("/", public, admin);

module.exports = router;