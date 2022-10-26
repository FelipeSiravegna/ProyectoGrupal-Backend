const express = require("express");
const router = express.Router();
const controller = require("../controllers/index");

router.get("/:id", controller.getDetail);

module.exports = router;
