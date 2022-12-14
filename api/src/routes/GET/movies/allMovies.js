const { Router } = require("express");
const router = Router();
const { DB_Movies } = require('../../../controllers/GET/movies/allMovies')

router.get('/', async (req, res) => {
    try {
        const DBMovies = await DB_Movies()
        res.status(200).json(DBMovies)
    } catch (error) {
        res.status(404).send(error.message)
    }
})

module.exports = router;