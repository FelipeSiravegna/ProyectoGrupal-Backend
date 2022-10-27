const { API_KEY } = process.env;
const axios = require('axios');

const getImageFromAPI = async (movieId, movieOriginalLanguage) => {
  const APIResponseImage = await axios.get(
    `https://api.themoviedb.org/3/movie/${movieId}/images?api_key=${API_KEY}`
  );
  
  const image = APIResponseImage.data.posters.find(
    (poster) =>
      poster.iso_639_1 === movieOriginalLanguage
  );
  
  const imageKey = image.file_path;

  const imageURL = `https://image.tmdb.org/t/p/w600_and_h900_bestv2${imageKey}`;

  return imageURL;
};

module.exports = {getImageFromAPI};
