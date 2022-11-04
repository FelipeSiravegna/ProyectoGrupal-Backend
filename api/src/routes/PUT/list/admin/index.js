const { Router } = require("express");
const router = Router();
const manageBanning = require("./manageBanning");
const manageDeletion = require("./manageDeletion");

router.use ("/", manageDeletion, manageBanning);

module.exports = router;