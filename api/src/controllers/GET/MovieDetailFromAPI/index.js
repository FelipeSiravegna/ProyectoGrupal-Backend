const { API_KEY } = process.env;
const axios = require('axios');
const { getTrailer } = require('../TrailerFromAPI');
const { getCreditsFromAPI } = require('../CreditsFromAPI');

const getMovieFromAPI = async (movieId) => {
    const movieInfoAPI = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}`);

    const movieInfo = movieInfoAPI.data;

    const genres = movieInfo.genres.map((genre) => {
        const newGenre = {
            id: genre.id,
            name: genre.name
        }

        return newGenre;
    })

    const movieDetails = {
        id: movieInfo.id,
        name: movieInfo.title,
        description: movieInfo.overview,
        image: `https://image.tmdb.org/t/p/original${movieInfo.poster_path}`,
        language: movieInfo.original_language,
        releaseDate: movieInfo.release_date,
        length: movieInfo.runtime,
        rating: movieInfo.vote_average,
        trailer: await getTrailer(movieInfo.id, movieInfo.original_language),
        popularity: movieInfo.popularity,
        genres: genres,
        fullCast: await getCreditsFromAPI(movieInfo.id),
        saves: 0
    }

    return movieDetails;
}

module.exports = { getMovieFromAPI }