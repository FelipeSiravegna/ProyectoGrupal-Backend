const controller = {};
const axios = require("axios");
const { API_KEY } = process.env;
const { Movie } = require("../db");

controller.getDetail = async (req, res) => {
  const { id } = req.params;
  try {
    if (id.includes("-")) {
      const movie = await Movie.findOne({
        where: { id },
      });

      const movieDetails = {
        id: movie.id,
        name: movie.name,
        description: movie.description,
        image: movie.image,
        language: movie.language,
        releaseDate: movie.releaseDate,
        length: movie.length,
        rating: movie.rating,
        trailer: movie.trailer,
        saves: movie.saves,
      };

      res.status(200).json(movieDetails);
    } else {
      const APIResponseDetail = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=4b982050d0e82cda0dd3e62e3b4f0e1a`
      );

      const APIResponseImage = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}/images?api_key=4b982050d0e82cda0dd3e62e3b4f0e1a`
      );

      const APIResponseVideo = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}/videos?api_key=4b982050d0e82cda0dd3e62e3b4f0e1a`
      );

      const trailer = APIResponseVideo.data.results.find(
        (trailer) =>
          trailer.type === "Trailer" &&
          trailer.iso_639_1 === APIResponseDetail.data.original_language
      );

      const trailerKey = trailer.key;

      const image = APIResponseImage.data.posters.find(
        (poster) =>
          poster.iso_639_1 === APIResponseDetail.data.original_language
      );

      const imageKey = image.file_path;
      const movie = APIResponseDetail.data;

      const movieDetails = {
        id: movie.id,
        name: movie.title,
        description: movie.overview,
        image: `https://image.tmdb.org/t/p/w600_and_h900_bestv2${imageKey}`,
        language: movie.original_language,
        releaseDate: movie.release_date,
        length: movie.runtime,
        rating: movie.vote_average,
        trailer: `https://www.youtube.com/watch?v=${trailerKey}`,
        saves: 0,
      };

      res.status(200).json(movieDetails);
    }
  } catch (e) {
    console.log(e);
    res.status(404).json({ error: "Movie not found!" });
  }
};

module.exports = controller;
