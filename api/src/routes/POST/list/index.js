const { Router } = require("express");
const router = Router();
const { getUserLists } = require("../../../controllers/GET/lists");

router.post("/:userId", async(req, res)=>{
    try{
        const { userId } = req.params;
        const userLists = await getUserLists();
        if(!userLists){
            res.status(500).json({status:500, message:"Oh, no!. There was a problem"});
        }else{
            res.status(200).json(userLists);
        }
    }catch(error){
        console.log(error)
        console.log("_____________________________");
        console.log(error.message);
    }
});

module.exports = router;