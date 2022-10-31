const { getMovieFromDB } = require('../MovieDetailFromDB');
const {getMovieFromAPI} = require('../MovieDetailFromAPI');

const getMovieDetail = async (movieId) => {
    let movie = null;

    if(movieId.includes('-')){
        const movieDetails = await getMovieFromDB(movieId);

        movie = movieDetails;
    } else {
        const movieDetails = await getMovieFromAPI(movieId);

        movie = movieDetails;
    }

    return movie;
}

module.exports = {getMovieDetail}