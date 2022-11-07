const { Router } = require("express");
const router = Router();
const handleUserBanning = require("./handleBanning");
const handlePremium = require("./handlePremium");
const handleAdmin = require("./handleAdmin");

router.use("/", handleUserBanning, handlePremium, handleAdmin);

module.exports = router;