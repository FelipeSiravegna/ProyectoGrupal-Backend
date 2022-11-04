const { Router } = require("express");
const router = Router();
const {DB_Movies} = require('../../../controllers/GET/movies/popular.js')

router.get('/',async (req,res)=>{
    let {page} = req.query
    if (page!=undefined) {page=(page-1)*10}
    try {
        const DBMovies = await DB_Movies(page) 
        res.status(200).json(DBMovies)
    } catch (error) {
        res.status(404).send(error.message)
    }
})

module.exports= router;