const  { Router } = require("express");
const { getAllUserInfo } = require("../../../controllers/GET/users");
const router = Router();

router.get("/user/:userId", async (req, res) => {
    try {
        const {userId}=req.params;
        const user = await getAllUserInfo(userId);
        if(user){
            res.status(200).json(user);
            return;
        }else{
            res.status(404).json({error:"This user doesn't exist"});
            return;
        }
    } catch(error) {
        console.log(error);
        console.log("______________________");
        console.log(error.message);
        res.status(500).json({error:"There was an error while trying to get the user"});
    }
});

module.exports = router;