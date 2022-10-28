const axios = require('axios');
const {Genre} = require('../../../db.js');
const {API_KEY} = process.env

const DBMovies = async (genre)=>{
    
}

const moviesFromApi = async (genre)=>{
    const {data} = await axios.get(`https://api.themoviedb.org/3/discover/movie?with_genres=${genre}&api_key=${API_KEY}&sort_by=vote_average.desc`)
    const arrayAux = [data]
    const neededInfo = arrayAux.map((datas)=>{return datas.results.map((i)=>{
        return {id:i.id,name:i.title,description:i.overview,image:`https: //image.tmdb.org/t/p/w600_and_h900_bestv2${i.poster_path}`,rating:i.vote_average}
    })}).flat()
    return neededInfo
}

module.exports={moviesFromApi}