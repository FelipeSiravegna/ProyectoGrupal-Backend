const { Router } = require("express");
const router = Router();
const {getMovieFromDB, getMovieFromAPI} = require("../../../controllers/GET/MovieDetail");
const { getImageFromAPI } = require("../../../controllers/GET/Image");
const { getTrailerFromAPI } = require("../../../controllers/GET/Video");
const { getCredits } = require('../../../controllers/GET/Credits');

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const movieDB = await getMovieFromDB(id);
    
    if (!movieDB) {
      const movieAPI = await getMovieFromAPI(id);

      //CREAR MOVIE EN LA DB
      if (!movieAPI) {
        res.status(404).json({ error: "Movie not found!" });
      } else {
        const posterURL = await getImageFromAPI(id, movieAPI.original_language);

        const trailerURL = await getTrailerFromAPI(id, movieAPI.original_language);

        const castInfo = await getCredits(id);

        const movieDetails = {
          id: movieAPI.id,
          apiID: movieAPI.apiID,
          name: movieAPI.title,
          description: movieAPI.overview,
          image: posterURL,
          language: movieAPI.original_language,
          releaseDate: movieAPI.release_date,
          length: movieAPI.runtime,
          rating: movieAPI.vote_average,
          trailer: trailerURL,
          fullCast: castInfo,
          saves: 0,
        };

        res.status(200).json(movieDetails);
      }
    } else {
      res.status(200).json(movieDB);
    }
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = router;