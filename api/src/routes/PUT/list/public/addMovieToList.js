const { Router } = require("express");
const router = Router();
const { addMovieToList, deleteMovieFromList } = require("../../../../controllers/PUT/list");

router.put("/list/:listId", async (req, res) => {
    try {
        const { listId } = req.params;
        const { add, remove, movieId } = req.query;
        if (!movieId) {
            console.log("=========ERROR: QUERY 'movieId' IS NEEDED=========");
            res.status(400).json({ status: 400, message: "Oh, no! There was a problem" });
        } else {
            if (add === true || add === "true") {
                const addMovieInLIst = await addMovieToList(listId, movieId);
                if (!addMovieInLIst) {
                    res.status(500).json({ status: 500, message: "There was a problem while trying to add the movie to the list" });
                } else {
                    res.status(addMovieInLIst.status).json({ status: addMovieInLIst.status, message: addMovieInLIst.message });
                }
            } else if (remove === true || remove === "true") {
                const movieRemovedFromList = await deleteMovieFromList(listId, movieId);
                res.status(movieRemovedFromList.status).json(movieRemovedFromList);
            }
        }
    } catch (error) {
        console.log(error)
        console.log("_____________________________");
        console.log(error.message);
        res.status(500).json({ status: 500, message: "There was a problem to add the movie to the list" });
    }
});

module.exports = router;