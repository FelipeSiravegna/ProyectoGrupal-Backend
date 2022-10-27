const movieList = require('../../../../../MOVIES.json');

const getGenres = async (movieName, movieDescription) => {
    const movie = movieList.find(
        movie => movie.name === movieName && movie.description === movieDescription
    );

    return movie.genres;
}

module.exports = {getGenres};