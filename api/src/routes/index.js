const { Router } = require("express");
//Importar las routes
const getMoviesPopular = require('./GET/movies/popular.js')
const searchMovies = require('./GET/movies/search')
const getMovieDetail = require('./GET/MovieDetail/index');
const createMovie = require('../routes/POST/Movie');
const comingSoon = require('../routes/GET/ComingSoon');

const router = Router();
//router.use('/route', archivo route)
router.use('/movies/popular',getMoviesPopular)
router.use('/movies/search',searchMovies)
router.use('/detail', getMovieDetail);
router.use('/createMovie', createMovie);
router.use('/comingSoon', comingSoon);

module.exports = router;
