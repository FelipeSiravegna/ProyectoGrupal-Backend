const axios = require('axios');
const {Movie,Genre} = require('../../../db.js');
const {API_KEY} = process.env
const {Op} = require('sequelize')


const searchDB = async (name) =>{
    //const objeto = [name:{ [Op.substring]: name ]
    const filtredMovies = await Movie.findAll({where:{name:{ [Op.substring]:name }},include:Genre})
    return filtredMovies
}



module.exports={searchDB}