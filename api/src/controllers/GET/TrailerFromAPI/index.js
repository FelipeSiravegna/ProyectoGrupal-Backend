const axios = require('axios');
const {API_KEY} = process.env

const getTrailer = async (movieId, movieOriginal_language) => {
    const trailer = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${API_KEY}&language=${movieOriginal_language}`);

    const trailerVideo = trailer.data.results.find((trailer) => trailer.type === "Trailer");

    const trailerKey = trailerVideo.key;

    const trailerURL = `https://www.youtube.com/watch?v=${trailerKey}`;

    return trailerURL;
}

module.exports = {getTrailer};