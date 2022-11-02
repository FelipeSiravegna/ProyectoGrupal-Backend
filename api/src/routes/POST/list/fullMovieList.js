const { Router } = require("express");
const router = Router();
const { getUserListS, } = require("../../../controllers/GET/lists");

router.post("/addMovie", async(req, res)=>{
    try{
        const { listId, movieId } = req.query;
        
    }catch(error){
        console.log(error)
        console.log("_____________________________");
        console.log(error.message);
    }
});

module.exports = router;