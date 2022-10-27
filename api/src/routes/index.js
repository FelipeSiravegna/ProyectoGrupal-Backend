const { Router } = require("express");
const getMoviesPopular = require('./GET/movies/popular.js')
const searchMovies = require('./GET/movies/search')
//Importar las routes
const getMovieDetail = require("../routes/GET/MovieDetail");

const router = Router();
router.use("/detail", getMovieDetail);
//router.use('/route', archivo route)

router.use('/movies/popular',getMoviesPopular)
router.use('/movies/search',searchMovies)

module.exports = router;
