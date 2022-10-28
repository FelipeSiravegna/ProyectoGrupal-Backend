const movieList = require('../../../../MOVIES.json');

const getCredits = async (movieName, movieDescription) => {
    const movie = movieList.find(
        movie => movie.name === movieName && movie.description === movieDescription
    );

    console.log(movie.fullCast);
    
    return movie.fullCast;
}

module.exports = {getCredits};