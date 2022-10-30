const movieList = require('../../../../MOVIES.json');

const getCredits = async (movieName, movieDescription) => {
    const movie = movieList.find(
        movie => movie.name === movieName && movie.description === movieDescription
    );
    
    return movie.fullCast;
}

module.exports = {getCredits};