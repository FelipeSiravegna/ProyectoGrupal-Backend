const { Router } = require("express");
const router = Router();
const { getUserListS } = require("../../../controllers/GET/lists");

router.post("/:userId", async(req, res)=>{
    try{
        const { userId } = req.params;
        
    }catch(error){
        console.log(error)
        console.log("_____________________________");
        console.log(error.message);
    }
});

module.exports = router;