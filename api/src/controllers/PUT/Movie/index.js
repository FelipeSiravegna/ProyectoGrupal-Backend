const {Movie, Director, Actor} = require('../../../db');

const deleteMovie = async (movieId) => {
    const movie = await Movie.findOne({
        where: {
            id: movieId,
            active: true
        }
    })

    if(!movie || movie.active === false){
        return false;
    } else {
        await movie.update({active: false});
        await movie.save();
        return true;
    }
}

module.exports = {deleteMovie}