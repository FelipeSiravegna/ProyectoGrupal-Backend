const { Router } = require("express");
const router = Router();
const updateListData = require("./notBanned");
const manageBanning = require("./manageBanning");

router.use ("/", updateListData, manageBanning);

module.exports = router;