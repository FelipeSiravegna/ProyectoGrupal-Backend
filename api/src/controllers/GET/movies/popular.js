const {Movie} = require('../../../db.js');

const DB_Movies = async () => {
    const movies = await Movie.findAll({order:[['rating','DESC']]})
    return movies
}

module.exports={DB_Movies}

