const { Router } = require("express");
const router = Router();
const { handleListDeletion} = require("../../../../controllers/PUT/list");


router.put("/manageDeletion/:listId", async(req, res)=>{
    try{
        const {listId} = req.params;
        const {action} = req.query;
        const bannedLists = await handleListDeletion(listId, action);
        if(!bannedLists){
            res.status(500).json({status:500, message:"There was a problem while trying to get the banned lists"});
        }
        else{
            res.status(bannedLists.status).json(bannedLists);
        }
    }catch(error){
        console.log(error)
        console.log("_____________________________");
        console.log(error.message);
        res.status(500).json({status:500, message:"There was a problem while loading the needed data to handle the banning list"});
    }
});

module.exports=router;
