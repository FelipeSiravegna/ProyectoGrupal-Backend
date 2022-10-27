const axios = require('axios');
const {Movies} = require('../../../db.js');
const {API_KEY} = process.env
const {Op} = require('sequelize')


const searchDB = async (name) =>{
    const filtredMovies = await Movies.findAll({where:{name:{ [Op.substring]: name }}})
    return filtredMovies
}

const searchApi = async (name) =>{
    const apiMovies = await axios.get(`https://api.themoviedb.org/3/search/movie?query=${name}&api_key=${API_KEY}&language=en-US&page=1&include_adult=false`)
    const searchedMovies= apiMovies.data.results.map((i)=>{
        return {id:i.id,name:i.title,image:`https: //image.tmdb.org/t/p/w600_and_h900_bestv2${i.poster_path}`,description:i.overview }})
    return searchedMovies
}

module.exports={searchDB,searchApi}