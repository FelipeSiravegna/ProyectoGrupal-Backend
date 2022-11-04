const {Movie} = require('../../../db');

const banMovie = async (movieId) => {
    const movie = await Movie.findByPk(movieId);

    if(!movie || movie.banned === true){
        return false;
    } else {
        await movie.update({banned: true});
        await movie.save();
        return true;
    }
}

module.exports = {banMovie}