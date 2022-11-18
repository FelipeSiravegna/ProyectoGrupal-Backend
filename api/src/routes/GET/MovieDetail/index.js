const { Router } = require("express");
const router = Router();
const { getMovieDetail } = require("../../../controllers/GET/MovieDetail");

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const movie = await getMovieDetail(id);

    if (!movie) {
      res.status(404).json({ error: "Movie not found!" });
    } else {
      res.status(200).json(movie);
    }

  } catch (error) {
    console.log(error.message);
  }
});

module.exports = router;