const { Router } = require("express");
const router = Router();
const handleUserBanning = require("./handleBanning");
const handlePremium = require("./handlePremium");

router.use("/", handleUserBanning, handlePremium);

module.exports = router;