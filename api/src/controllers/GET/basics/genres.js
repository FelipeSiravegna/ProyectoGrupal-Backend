const {Genre} = require('../../../db.js');


const getGenres = async ()=>{
    const DBgenres = await Genre.findAll()
    return DBgenres
}



module.exports={getGenres}