const controller = {};
const axios = require("axios");
const { API_KEY } = process.env;

controller.getDetail = async (req, res) => {
  const { id } = req.params;
  try {
    const movie = await Movie.findOne({
      where: { id },
    });

    if (!movie) {
      const APIResponseDetail = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`
      );

      const APIResponseImage = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}/images?api_key=${API_KEY}`
      );

      const APIResponseVideo = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}`
      );

      const trailerKey = APIResponseVideo.data.results.find(
        (trailer) =>
          trailer.type === "trailer" &&
          trailer.iso_639_1 === APIResponseDetail.data.original_language
      );

      const imageKey = APIResponseImage.data.posters.find(
        (poster) =>
          poster.iso_639_1 === APIResponseDetail.data.original_language
      );

      const movie = APIResponseDetail.data;

      const movieDetails = {
        id: movie.id,
        name: movie.title,
        description: movie.overview,
        image: `https: //image.tmdb.org/t/p/w600_and_h900_bestv2${imageKey.file_path}`,
        language: movie.original_language,
        releaseDate: movie.release_date,
        length: movie.runtime,
        rating: movie.vote_average,
        trailer: `https://www.youtube.com/watch?v=${trailerKey.key}`,
        saves: 0,
      };

      res.status(200).json(movieDetails);
    } else {
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
    }
  } catch (e) {
    res.status(404).json({ error: "Movie not found!" });
  }
};
