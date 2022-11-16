const { Router } = require("express");
const router = Router();
const { createList, followList, unfollowList } = require("../../../controllers/POST/list");

router.post("/list/:userId", async(req, res)=>{
    try{
        const { userId } = req.params;
        const { action, list }=req.query;
        //action is a string with the user's command (follow or unfollow)
        //list is the list's id the user wants to follow or unfollow
        if(action&&list){
            if(action==="follow"){
                console.log("FOLLOW LIST");
                const followedList = await followList(userId, list);
                res.status(followedList.status).json(followedList);
            }
            else if(action==="unfollow"){
                console.log("UNFOLLOW LIST");
                const unfollowedList = await unfollowList(userId, list);
                res.status(unfollowedList.status).json(unfollowedList);
            }
        }else{
            console.log("POST LIST")
            const { name, description,ownerUserId} = req.body;
            console.log("uId:"+userId, "name: "+name, "des: "+description,"ownerUserId:"+ownerUserId);
            const newList = await createList(name, description, userId,ownerUserId);
            res.status(newList.status).json(newList);
        }
    }catch(error){
        console.log(error)
        console.log("_____________________________");
        console.log(error.message);
        res.status(500).json({status:500, message:"There was a problem"});
    }
});

module.exports = router;
