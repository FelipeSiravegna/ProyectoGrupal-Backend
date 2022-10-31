const movieList = require('../../../../MOVIES.json');
const {Movie, Genre} = require('../../../db');

const getGenresInfo = async (movieName, movieDescription) => {
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
        
        const genres = await movie.getGenres();
        const genresInfo = genres.map((g) => {
            const newGenre = {
                id: g.id,
                name: g.name
            }
            return newGenre;
        })

        return genresInfo
    } else {
        return movie.genres;
    }
}

module.exports = {getGenresInfo};