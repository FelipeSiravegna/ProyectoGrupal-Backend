// Importar todos los routers
const { Router } = require("express");
const router = Router();
const postUserRoute = require('./POST/user');
const putUserRoute = require("./PUT/user");
const getUsersRoute = require("./GET/users");
const getMoviesPopular = require('./GET/movies/popular.js')
const searchMovies = require('./GET/movies/search')
const getMovieDetail = require('./GET/MovieDetail/index');

// Configurar los routers
router.use('/user', postUserRoute, putUserRoute, async()=>console.log(putUserRoute));
router.use('/getusers', getUsersRoute);
router.use('/movies/popular',getMoviesPopular)
router.use('/movies/search',searchMovies)
router.use('/detail', getMovieDetail);


module.exports = router;