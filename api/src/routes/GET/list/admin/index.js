const { Router } = require("express");
const router = Router();
const getBannedLists = require("./banned");
const getLists = require("./notBanned");

router.use("/admin", getBannedLists, getLists);

module.exports = router;