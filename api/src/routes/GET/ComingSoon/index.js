const { Router } = require("express");
const router = Router();
const { getComingSoonMovies } = require('../../../controllers/GET/ComingSoon');

router.get('/', async (req, res) => {
    try {
        const comingSoon = await getComingSoonMovies();

        if (comingSoon.length) {
            res.status(200).json(comingSoon);
        } else {
            res.status(404).json({ error: "No upcoming movies available" });
        }
    } catch (error) {
        console.log(error.message)
    }
})

module.exports = router;