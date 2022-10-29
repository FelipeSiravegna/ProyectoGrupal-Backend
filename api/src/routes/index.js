const { Router } = require("express");
//Importar las routes
//MOVEIS
const getMoviesPopular = require('./GET/movies/popular.js')
const searchMovies = require('./GET/movies/search')
const getMovieDetail = require('./GET/MovieDetail/index');
const createMovie = require('../routes/POST/Movie');
const comingSoon = require('../routes/GET/ComingSoon');
const nowPlaying = require('./GET/NowPlaying/');
//USERS
const getUsers = require("./GET/users")
const postUser = require('./POST/user');
const putUser = require("./PUT/user");

const router = Router();
//router.use('/route', archivo route)
//MOVEIS
router.use('/movies/popular',getMoviesPopular)
router.use('/movies/search',searchMovies)
router.use('/detail', getMovieDetail);
router.use('/createMovie', createMovie);
router.use('/comingSoon', comingSoon);
router.use('/nowPlaying', nowPlaying);
//USERS
router.use("/users", getUsers);
router.use("/user", postUser, putUser)

module.exports = router;
