const {Movie} = require('../../../db.js');

const DB_Movies = async (page=0) => {
    const movies = await Movies.findAndCountAll({
        limit:10,
        offset:page,
        order:[['rating','DESC']]})

    return movies
}

module.exports={DB_Movies}