const { Router } = require("express");
const router = Router();
const { handleUserBanning } = require("../../../controllers/PUT/user");

router.put("/", async (req, res)=>{
    try{
        const { data, action } = req.query;
        const handleBanning = await handleUserBanning(data, action);
        res.status(handleBanning.status).json(handleBanning);
    }
    catch(error){
        console.log(error);
        console.log("______________________");
        console.log("                ERROR: "+error.message);
        if(action!=="bann"){
            res.status(500).json({status:500, message:"There was an error while trying to unbann the user."});
        }else{
            res.status(500).json({status:500, message:"There was an error while trying to bann the user."});
        }
        
    }
});



module.exports = router;