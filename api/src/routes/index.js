const { Router } = require("express");
const getMoviesPopular = require('./GET/movies/popular.js')
//Importar las routes

const router = Router();

//router.use('/route', archivo route)

router.use('/movies/popular',getMoviesPopular)

module.exports = router;
