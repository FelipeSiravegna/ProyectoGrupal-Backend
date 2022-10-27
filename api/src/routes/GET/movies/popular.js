const { Router } = require("express");
const router = Router();
const {DB_Movies,moviesFromApi} = require('../../../controllers/GET/movies/popular.js')



router.get('/',async (req,res)=>{
    try {
        const DBMovies = await DB_Movies() 
        const moviesFrom_Api = await moviesFromApi()
        
        if (DBMovies.length>0){
            const envio = [...DB_Movies,...moviesFrom_Api].sort((a, b) => a.rating.localeCompare(b.rating))
            res.status(200).json(envio)
        }
        res.status(200).json(moviesFrom_Api)
    } catch (error) {
        
    }
})


module.exports= router;