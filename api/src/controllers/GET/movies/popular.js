//const  API_KEY  = process.env.API_KEY;
const axios = require('axios');
const {Movies} = require('../../../db.js');
const sequelize = require('sequelize')

const DB_Movies = async () => {
    const movies = await Movies.findAll({order:[['rating','DESC']]})
    return movies
}

module.exports={DB_Movies}

