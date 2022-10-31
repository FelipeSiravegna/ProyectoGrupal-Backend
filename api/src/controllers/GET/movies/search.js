const axios = require('axios');
const {Movies,Genre,Actor,Director} = require('../../../db.js');
const {API_KEY} = process.env
const {Op} = require('sequelize')


const searchDB = async (name="",actor=[],director=[],genres=[],page=0) =>{
    console.log('name:',name,'actor:',actor,'director:',director,'genres:',genres,'page:',page)
    //const objeto=`[Op.and]:[{name:{ [Op.substring]:${name} }},{genres:${genres}}]`
    //const objeto2 = `{name:{ [Op.substring]:${name} }}'$genres.name$':{ [Op.substring]:genres}}`
    //console.log(objeto2)
    const filtredMovies = await Movies.findAndCountAll(
        {limit:10,
        offset:page,
        where:{
            name:{ [Op.iLike]:`%${name}%`},
            //'$genres.id$':{ [Op.ne]: 28}            
        },
        include:{ 
            model:Genre ,as : "genres", attributes: ["name","id"] , through: {attributes:[]}},
        distinct:true
        })        
    return filtredMovies
}



module.exports={searchDB}