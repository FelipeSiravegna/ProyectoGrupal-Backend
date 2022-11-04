const { Router } = require("express");
const router = Router();
const updateListData = require("./public");
const manageBanning = require("./admin");

router.use ("/", updateListData, manageBanning);

module.exports = router;