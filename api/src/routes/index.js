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
const deleteDirector = require('./DELETE/Director');
const deleteActor = require('./DELETE/Actor');
//USERS
const getUsers = require("./GET/users")
const postUser = require('./POST/user');
const putUser = require("./PUT/user");
const deleteUser = require("./DELETE/user");

// REVIEWS
const reviews = require('./reviewRoutes')
const likes = require('./likeRoutes')
//start building route trees

//PAYMENTS
const getSubscription = require("./POST/payment/mercadoPago")
const responseMP = require("./POST/payment/responseMP")

//LISTS
// const getListS = require("./GET/lists");
// const updateListData = require("./PUT/list");

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
router.use('/deleteDirector', deleteDirector);
router.use('/deleteActor', deleteActor);

//USERS
router.use("/users", getUsers);
router.use("/user", postUser, putUser, deleteUser);
router.use("/user", postUser, putUser);

//REVIEWS
router.use("/reviews", reviews)

//LIKES
router.use("/likes", likes)

//LISTS
// router.use("/lists", getListS, updateListData);

//PAYMENTS
router.use("/subscribe",getSubscription)
router.use("/responseMP",responseMP)

module.exports = router;