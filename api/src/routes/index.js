const { Router } = require("express");
//Importar las routes
const getDetail = require("./getDetail");

const router = Router();

router.use("/detail", getDetail);

module.exports = router;
