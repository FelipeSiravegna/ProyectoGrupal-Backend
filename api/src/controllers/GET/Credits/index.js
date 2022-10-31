const movieList = require('../../../../MOVIES.json');
const {Movie, Actor, Director} = require('../../../db');

const getCredits = async (movieName, movieDescription) => {
    const movie = movieList.find(
        movie => movie.name === movieName && movie.description === movieDescription
    );

    if(!movie){
        const movie = await Movie.findOne({
            where: {
                name: movieName,
                description: movieDescription
            }
        })

        const actors = await movie.getActors();

        const actorsObject = actors.map((act) => {
            return {
                id: act.id,
                name: act.name
            }
        })

        const directorInfo = await movie.getDirector();

        const director = {
            id: directorInfo.id,
            name: directorInfo.name
        }

        const fullCast = {
            director: director,
            cast: actorsObject
        }

        return fullCast;
    } else {
        return movie.fullCast;
    }   
}

module.exports = {getCredits};