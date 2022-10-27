const { Router } = require("express");
const router = Router();
const {searchDB,searchApi} = require('../../../controllers/GET/movies/search.js')

router.get('/',async (req,res)=>{
    const {name} = req.query
    try {
        const DB = await searchDB(name)
        const Api = await searchApi(name)
        const send = [...DB,...Api]
        res.status(200).json(send)
    } catch (error) {
        res.status(404).send(error.message)        
    }
})


module.exports=router