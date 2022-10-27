const { Movie } = require('../../../db');
const { API_KEY } = process.env;
const axios = require('axios');

const getMovieFromDB = async (id) => {
  const movie = await Movie.findOne({
    where: {id}
  });

  const movieDetails = {
    id: movie.id,
    name: movie.name,
    description: movie.description,
    image: movie.image,
    language: movie.original_language,
    releaseDate: movie.releaseDate,
    length: movie.length,
    rating: movie.rating,
    trailer: movie.trailer,
    saves: movie.saves,
  };
  
  return movieDetails;
};

const getMovieFromAPI = async (movieId) => {
  const movie = await axios.get(
    `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}`
  );

  return movie.data;
};

module.exports = { getMovieFromAPI, getMovieFromDB };