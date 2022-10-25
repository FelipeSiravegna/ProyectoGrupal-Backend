const express = require("express");
const router = express.Router();
const controller = require("../controllers/index");

//router.use('/route', archivo route)

router.get("/:id", controller.getDetail);

module.exports = router;
