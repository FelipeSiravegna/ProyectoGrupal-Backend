const {Movie} = require('../../../db.js');

const DB_Movies = async (page=0,ord) => {
    const movies = await Movie.findAndCountAll({
        limit:10,
        offset:page,
        order:[['rating',`${ord}`]]})

    return movies
}

module.exports={DB_Movies}