const { Router } = require("express");
//Importar las routes
const getMovieDetail = require("../routes/GET/MovieDetail");

const router = Router();
router.use("/detail", getMovieDetail);
//router.use('/route', archivo route)

module.exports = router;
