const { Router } = require("express");
const router = Router();
const {DB_Movies} = require('../../../controllers/GET/movies/rating')

router.get('/:page/:ord',async (req,res)=>{
    let {page,ord} = req.params
    if (page!=undefined) {page=(page-1)*10}
    try {
        const DBMovies = await DB_Movies(page,ord) 
        res.status(200).json(DBMovies)
    } catch (error) {
        res.status(404).send(error.message)
    }
})

module.exports= router;