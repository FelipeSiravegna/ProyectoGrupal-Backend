//const  API_KEY  = process.env.API_KEY;
const axios = require('axios');
const {Movies} = require('../../../db.js');

const DB_Movies = async () => {
    const movies = await Movies.findAll()
    return movies
}

const moviesFromApi = async ()=>{
    const Top1 = await axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.API_KEY}&language=es-Es&page=1`)
    const Top2 = await axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.API_KEY}&language=es-Es&page=2`)
    const Top3 = await axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.API_KEY}&language=es-Es&page=3`)
    const Top4 = await axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.API_KEY}&language=es-Es&page=4`)
    const Top5 = await axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.API_KEY}&language=es-Es&page=5`)
    const arrayAux = [Top1.data,Top2.data,Top3.data,Top4.data,Top5.data]
    const neededInfo = arrayAux.map((datas)=>{return datas.results.map((i)=>{
        return {id:i.id,name:i.title,description:i.overview,image:`https: //image.tmdb.org/t/p/w600_and_h900_bestv2${i.poster_path}`,rating:i.vote_average}
    })}).flat()
    return neededInfo
}




module.exports={DB_Movies,moviesFromApi}

