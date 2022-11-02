const { Router } =require("express");
const router = Router();
const { updateList } = require("../../../../controllers/PUT/list");

router.put ("/list/:listId/update", async(req,res)=>{
    try{
        const {listId}= req.params;
        const { name, description } = req.body;
        const updatingList = await updateList(listId, name, description);
        if(!updatingList){
            res.status(500).json({status:500, message:"There was a problem to update the list"});
        }else{
            res.status(200).json(updatingList);
        }
    }catch(error){
        console.log(error)
        console.log("_____________________________");
        console.log(error.message);
        res.status(500).json({status:500, message:"There was a problem to update the list"});
    }
});

module.exports = router;