// Import routes
const { Router } = require("express");
const router = Router();

//MOVIES
const getMoviesPopular = require('./GET/movies/popular.js')
const getMoviesRating = require('./GET/movies/rating')
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

const userLogin = require("./MIDDLEWARES/JWT/Index")
const availableUsers = require('./GET/users/allAvailableUsers');
const activeUsers = require('./GET/users/allActiveUsers');
const bannedUsers = require('./GET/users/allBannedUsers');
const deletedUsers = require('./GET/users/allDeletedUsers');
const premiumUsers = require('./GET/users/allPremiumUsers');
const freeUsers = require('./GET/users/allFreeUsers');
const allUsers = require('./GET/users/allUsers');

const makePremium = require('./PUT/user/changePremium')

const followUnfollow = require('./PUT/Follow-Unfollow');

// REVIEWS
const reviews = require('./reviewRoutes')
const likes = require('./likeRoutes')
const banReview = require('./PUT/BanReview');
const deleteReview = require('./DELETE/Review');
const updateReview = require('./PUT/UpdateReview');
//start building route trees

//PAYMENTS
const getSubscription = require("./POST/payment/mercadoPago")
const responseMP = require("./POST/payment/responseMP")

//DIRECTORS
const getActiveDirectors = require('./GET/Directors');

//LISTS
const postList = require("./POST/list");
const putList = require("./PUT/list");
const getLists = require("./GET/lists");

//MOVIES
router.use('/movies/popular', getMoviesPopular)
router.use('/movies/rating', getMoviesRating)
router.use('/movies/all', getAllMovies)
router.use('/movies/search', searchMovies)
router.use('/detail', getMovieDetail);
router.use('/createMovie', createMovie);
router.use('/genres', getGenres)
router.use('/comingSoon', comingSoon);
router.use('/nowPlaying', nowPlaying);
router.use('/deleteMovie', deleteMovie);
router.use('/deleteDirector', deleteDirector);
router.use('/deleteActor', deleteActor);
router.use('/banMovie', banMovie);
router.use('/banActor', banActor);
router.use('/banDirector', banDirector);

//USERS

router.use("/login", userLogin)
router.use("/users", getUsers);
router.use("/user", postUser, putUser, deleteUser);
router.use("/user", postUser, putUser);
router.use('/availableUsers', availableUsers);
router.use('/activeUsers', activeUsers);
router.use('/bannedUsers', bannedUsers);
router.use('/deletedUsers', deletedUsers);
router.use('/premiumUsers', premiumUsers);
router.use('/freeUsers', freeUsers);
router.use('/allUsers', allUsers);
router.use('/premium', makePremium)
router.use('/followUnfollow', followUnfollow);

//REVIEWS
router.use("/reviews", reviews)
router.use('/banReview', banReview);
router.use('/deleteReview', deleteReview);
router.use('/updateReview', updateReview);

//LIKES
router.use("/likes", likes)

//DIRECTORS
router.use('/directors', getActiveDirectors);

//LISTS
//router.use("/lists", postList, getLists, putList);

//PAYMENTS
router.use("/subscribe", getSubscription)
router.use("/responseMP", responseMP)

module.exports = router;
