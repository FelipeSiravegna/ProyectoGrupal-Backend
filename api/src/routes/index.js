const { Router } = require("express");
//Importar las routes
const getMoviesPopular = require('./GET/movies/popular.js')
const searchMovies = require('./GET/movies/search')
const getMovieDetail = require('./GET/MovieDetail/index');

const router = Router();
//router.use('/route', archivo route)
router.use('/movies/popular',getMoviesPopular)
router.use('/movies/search',searchMovies)
router.use('/detail', getMovieDetail);


module.exports = router;
