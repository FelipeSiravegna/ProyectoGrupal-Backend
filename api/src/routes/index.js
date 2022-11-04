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
const banMovie = require('./PUT/BanMovie');
const banActor = require('./PUT/BanActor');
const banDirector = require('./PUT/BanDirector');
//USERS
const getUsers = require("./GET/users")
const postUser = require('./POST/user');
const putUser = require("./PUT/user");
const deleteUser = require("./DELETE/user");

// REVIEWS
const reviews = require('./reviewRoutes')
const likes = require('./likeRoutes')
const banReview = require('./PUT/BanReview');
const deleteReview = require('./DELETE/Review');
//start building route trees

//PAYMENTS
const getSubscription = require("./POST/payment/mercadoPago")

//LISTS
// const getListS = require("./GET/lists");
// const updateListData = require("./PUT/list");
const deleteList = require('./DELETE/List');

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
router.use('/banMovie', banMovie);
router.use('/banActor', banActor);
router.use('/banDirector', banDirector);

//USERS
router.use("/users", getUsers);
router.use("/user", postUser, putUser, deleteUser);
router.use("/user", postUser, putUser);

//REVIEWS
router.use("/reviews", reviews)
router.use('/banReview', banReview);
router.use('/deleteReview', deleteReview);

//LIKES
router.use("/likes", likes)

//LISTS
// router.use("/lists", getListS, updateListData);
router.use('/deleteList', deleteList);

//PAYMENTS
router.use("/subscribe",getSubscription)

module.exports = router;