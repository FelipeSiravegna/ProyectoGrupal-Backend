//const  API_KEY  = process.env.API_KEY;
const axios = require('axios');
const {Movie} = require('../../../db.js');
const sequelize = require('sequelize')

const DB_Movies = async () => {
    const movies = await Movie.findAll({order:[['rating','DESC']]})
    return movies
}

module.exports={DB_Movies}

