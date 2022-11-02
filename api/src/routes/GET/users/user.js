const  { Router } = require("express");
const { getUserByPk } = require("../../../controllers/GET/users");
const { getUserListS } = require("../../../controllers/GET/lists");
const router = Router();

router.get("/user/:userId", async (req, res) => {
    try {
        console.log("GET USER DATA");
        const {userId}=req.params;
        const user = await getUserByPk(userId);
        if(user){
            res.status(200).json(user);
        }else{
            res.status(404).json({status:404, message:"This user doesn't exist"});
        }
    } catch(error) {
        console.log(error);
        console.log("______________________");
        console.log(error.message);
        res.status(500).json({ status:500, message:"There was an error while trying to get the user" });
    }
});


router.get("/user/:userId/lists", async(req, res)=>{
    const { userId } = req.params;
    try{
        const userLists = await getUserListS(userId);
        if(!userLists){
            res.status(500).json({status:500, message:"There was a problem while loading the user data"});
        }
        else if(!Object.keys(userLists).includes("lists")){
            res.status(500).json({status:500, message:"There was a problem while loading the user movie lists"});
        }
        else if(!userLists.lists.length){
            res.status(404).json({status:404, message:"The user doesn't have any movie list"});
        }
        else{
            res.status(200).json(userLists);
        }
    }catch(error){
        console.log(error)
        console.log("_____________________________");
        console.log("ERROR: "+error.message);
        res.status(500).json({status:500, message:"There was a problem while loading the user data"});
    }
});


module.exports = router;

