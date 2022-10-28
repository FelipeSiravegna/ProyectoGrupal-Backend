const { Router } = require("express");
const router = Router();
const {moviesFromApi} = require('../../../controllers/GET/filters/genres.js')


router.get('/:genre',async (req,res)=>{
    const {genre} = req.params
    console.log(genre)
    try {
        const api = await moviesFromApi(genre)
        res.status(200).json(api)
    } catch (error) {
        res.status(404).send(error.message)
    }
})

module.exports=router