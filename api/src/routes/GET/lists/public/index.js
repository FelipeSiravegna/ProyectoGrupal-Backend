const { Router } = require("express");
const router = Router();
const { getAvailableLists, getListAndContent } = require("../../../../controllers/GET/lists");

router.get ("/", async(req, res)=>{
    try{
        const lists = await getAvailableLists();
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

router.get("/list/:listId", async(req, res)=>{
    try{
        const { listId } = req.params;
        if(listId){
            const list = await getListAndContent(listId);
            if(!list){
                res.status(404).json({status:404, message:"This list doesn't exist"});
            }
            else if (!list.movies){
                res.status(500).json({status:500, message:"There was a problem while loading the movies in this list"});
            }
            else if(!list.movies.length){
                res.status(404).json({status:404, message:"There are no movies in this list"});
            }
            else{
                res.status(200).json(list);
            }
        }
    }catch(error){
        console.log(error)
        console.log("_____________________________");
        console.log(error.message);
        res.status(500).json({status:500, message:"There was a problem while loading the user movie lists"});
    }
});

module.exports = router;
