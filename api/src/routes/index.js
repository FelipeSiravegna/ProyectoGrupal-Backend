// Importar todos los routers
const { Router } = require("express");
const router = Router();
const getUsers = require("./GET/users")
const postUser = require('./POST/user');
const putUser = require("./PUT/user");

// const getMoviesPopular = require('./GET/movies/popular.js')
// const searchMovies = require('./GET/movies/search')
// const getMovieDetail = require('./GET/MovieDetail/index');

// Configurar los routers
router.use("/users", getUsers);
router.use("/user", postUser, putUser)
// router.use('/get', getUsers);
// router.use('/create', postUserRoute);
// router.use('/update', putUserRoute);

// router.use('/movies/popular',getMoviesPopular)
// router.use('/movies/search',searchMovies)
// router.use('/detail', getMovieDetail);


module.exports = router;