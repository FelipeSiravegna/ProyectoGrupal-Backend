const { Router } = require("express");
const router = Router();
const { handlePremium } = require("../../../../../controllers/PUT/user");

router.put("/:userId/premium", async (req, res)=>{
    try{
        const { userId } = req.params;
        const handlePRemium = await handlePremium(userId);
        res.status(handlePRemium.status).json(handlePRemium.message);
    }
    catch(error){
        console.log(error);
        console.log("______________________");
        console.log("                ERROR: "+error.message);
        res.status(500).json({status:500, message:"Oh, no! There was an error."});
    }
});



module.exports = router;