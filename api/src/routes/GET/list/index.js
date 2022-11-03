const { Router } = require("express");
const router = Router();
const public = require("./public/notBaned");
const admin = require("./admin");

router.use ("/", admin, public);

module.exports = router;