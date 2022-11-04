const { Router } = require("express");
const router = Router();
const { getBannedLists } = require("../../../../controllers/GET/lists");

router.get ("/banned", async(req, res)=>{
    try{
        const bannedLists = await getBannedLists();
        if(!bannedLists){
            res.status(500).json({status:500, message:"There was a problem while trying to get the banned movie lists"});
        }
        else if (!bannedLists.length){
            res.status(404).json({status:404, message:"There aren't banned movie lists"});
        }
        else{
            res.status(200).json(lists);
        }
    }catch(error){
        console.log(error)
        console.log("_____________________________");
        console.log(error.message);
        res.status(500).json({status:500, message:"There was a problem while loading the user movie lists"});
    }
});

module.exports = router;
