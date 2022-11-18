const { Router } = require("express");
const router = Router();
const { deleteMovie } = require('../../../controllers/DELETE/Movie');

router.put('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const response = await deleteMovie(id);
        if (response === false) {
            res.status(404).json({ error: "Movie not found" });
        } else {
            res.status(200).json("Movie deleted successfully");
        }
    } catch (error) {
        console.log(error.message);
    }
})

module.exports = router;