// Import routes
const { Router } = require("express");
const router = Router();
//MOVIES
const getMoviesPopular = require('./GET/movies/popular.js')
const getAllMovies = require('./GET/movies/allMovies')
const searchMovies = require('./GET/movies/search')
const getMovieDetail = require('./GET/MovieDetail/index');
const createMovie = require('../routes/POST/Movie');
const getGenres = require('./GET/basics/genres')
const comingSoon = require('../routes/GET/ComingSoon');
const nowPlaying = require('./GET/NowPlaying/');
const deleteMovie = require('./DELETE/Movie');
//USERS
const getUsers = require("./GET/users")
const postUser = require('./POST/user');
const putUser = require("./PUT/user");
const deleteUser = require("./DELETE/user");
//start building route trees
//PAYMENTS
const getSubscription = require("./POST/payment/mercadoPago")

//MOVIES
router.use('/movies/popular',getMoviesPopular)
router.use('/movies/all',getAllMovies)
router.use('/movies/search',searchMovies)
router.use('/detail', getMovieDetail);
router.use('/createMovie', createMovie);
router.use('/genres',getGenres)
router.use('/comingSoon', comingSoon);
router.use('/nowPlaying', nowPlaying);
router.use('/deleteMovie', deleteMovie);
//USERS
router.use("/users", getUsers);
router.use("/user", postUser, putUser, deleteUser);



//PAYMENTS
router.use("/subscribe",getSubscription)




module.exports = router;