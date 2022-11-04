const { Router } = require("express");
const router = Router();
const getBannedLists = require("./banned");
const getInactiveLists = require("./inactive"); //lists set as deleted

router.use("/", getBannedLists, getInactiveLists);

module.exports = router;