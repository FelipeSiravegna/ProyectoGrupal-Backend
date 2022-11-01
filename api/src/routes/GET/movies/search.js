const { Router } = require("express");
const router = Router();
const {searchDB} = require('../../../controllers/GET/movies/search.js')

router.get('/',async (req,res)=>{
    const {name,actor,director,genres} = req.query
    let {page} = req.query
    if (page!=undefined) {page=(page-1)*10}
    try {
        const DB = await searchDB(name,actor,director,genres,page)
        res.status(200).json(DB)
    } catch (error) {
        res.status(404).send(error.message)        
    }
})


module.exports=router