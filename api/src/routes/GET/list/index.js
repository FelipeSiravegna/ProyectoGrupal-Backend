const { Router } = require("express");
const router = Router();
const notBannedLists = require("./notBanned/notBaned");
const bannedLists = require("./banned");

router.use ("/", bannedLists, notBannedLists);

module.exports = router;