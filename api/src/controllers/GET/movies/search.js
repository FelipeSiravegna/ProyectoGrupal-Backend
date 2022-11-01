const {Movie,Genre,Actor,Director} = require('../../../db.js');
const {Op} = require('sequelize')
const {genresFilter} = require ('./filters/genresFilter')
const {actorsFilter} = require ('./filters/actionFilter')
const {directorFilter} = require ('./filters/directorsFilter')
const searchDB = async (name="",actor=[],director="",genres=[],page=0) =>{
    console.log('name:',name,'actor:',actor,'director:',director,'genres:',genres,'page:',page)
    const filtredMovies = await Movie.findAndCountAll(
        { 
        where:{
            name:{ [Op.iLike]:`%${name}%`},
            //'$genres$':{id:{ [Op.ne]: 28}}            
        },
        include:[{model:Genre ,as : "genres", attributes: ["name","id"] , through: {attributes:[]}},
            {model:Actor ,as : "actors" },
            {model:Director ,as : "director" }],
        distinct:true
        })        
    let movies = JSON.parse(JSON.stringify(filtredMovies))
    console.log('empiezo aca---------------------')
    if (genres.length!=0) { 
        const auxGenres = genresFilter(movies,genres)
        movies= {"count":auxGenres.length,"rows":auxGenres}}
    if (actor.length!=0) { 
        const auxActors = actorsFilter(movies,actor)
        movies= {"count":auxActors.length,"rows":auxActors}}
    if (director.length!=0) { 
        const auxDirector = directorFilter(movies,director)
        movies= {"count":auxDirector.length,"rows":auxDirector}}

    return movies
}

module.exports={searchDB}