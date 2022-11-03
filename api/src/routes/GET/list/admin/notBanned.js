const { Router } = require("express");
const router = Router();
const { getAllLists } = require("../../../../controllers/GET/lists");

router.get ("/notBanned", async(req, res)=>{
    try{
        const lists = await getAllLists();
        if(!lists){
            res.status(500).json({status:500, message:"There was a problem while trying to get the movie lists"});
        }
        else if(!lists.length){
            res.status(404).json({status:404, message:"There aren't any movie list"});
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