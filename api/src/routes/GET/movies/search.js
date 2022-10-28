const { Router } = require("express");
const router = Router();
const {searchDB} = require('../../../controllers/GET/movies/search.js')

router.get('/',async (req,res)=>{
    const {name} = req.query
    try {
        const DB = await searchDB(name)
        res.status(200).json(DB)
    } catch (error) {
        res.status(404).send(error.message)        
    }
})


module.exports=router