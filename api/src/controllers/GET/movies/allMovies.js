const {Movie} = require('../../../db.js');

const DB_Movies = async (page=0) => {
    const movies = await Movie.findAndCountAll({
        attributes:["name","id"],
        offset:page,
        //order:[['rating','DESC']]
    })

    return movies
}

module.exports={DB_Movies}