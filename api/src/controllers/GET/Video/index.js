const { API_KEY } = process.env;
const axios = require('axios');

const getTrailerFromAPI = async (movieId, movieOriginalLanguage) => {
  const APIResponseVideo = await axios.get(
    `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${API_KEY}`
  );

  const trailer = APIResponseVideo.data.results.find(
    (trailer) =>
      trailer.type === "Trailer" &&
      trailer.iso_639_1 === movieOriginalLanguage
  );

  const trailerKey = trailer.key;

  const trailerURL = `https://www.youtube.com/watch?v=${trailerKey}`;

  return trailerURL;
};

module.exports = {getTrailerFromAPI};
