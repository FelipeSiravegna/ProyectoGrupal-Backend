const { Router } = require("express");
const getMoviesPopular = require('./GET/movies/popular.js')
//Importar las routes
const getMovieDetail = require("../routes/GET/MovieDetail");

const router = Router();
router.use("/detail", getMovieDetail);
//router.use('/route', archivo route)

router.use('/movies/popular',getMoviesPopular)

module.exports = router;
