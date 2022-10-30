const { Router } = require("express");
const router = Router();
const {getGenres} = require('../../../controllers/GET/basics/genres')

router.get('/',async (req,res)=>{
    try {
        const DB = await getGenres() 
        res.status(200).json(DB)
    } catch (error) {
        res.status(404).send(error.message)
    }
})


module.exports=router