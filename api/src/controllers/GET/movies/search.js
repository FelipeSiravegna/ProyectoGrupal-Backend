const {Movie,Genre,Actor,Director} = require('../../../db.js');
const {Op} = require('sequelize')

const searchDB = async (name="",actor=[],director=[],genres=[],page=0) =>{
    console.log('name:',name,'actor:',actor,'director:',director,'genres:',genres,'page:',page)
    const filtredMovies = await Movie.findAndCountAll(
        {limit:10,
        offset:page,
        where:{
            name:{ [Op.iLike]:`%${name}%`},
            //'$genres.id$':{ [Op.ne]: 28}            
        },
        include:[{model:Genre ,as : "genres", attributes: ["name","id"] , through: {attributes:[]}},
            {model:Actor ,as : "actors" },
            {model:Director ,as : "director" }],
        distinct:true
        })        

    return filtredMovies
}

module.exports={searchDB}