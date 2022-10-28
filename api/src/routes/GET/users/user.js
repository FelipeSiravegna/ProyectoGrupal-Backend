const  { Router } = require("express");
const { getUserById } = require("../../../controllers/GET/users");
const router = Router();


router.get("/:userId", async (req, res) => {
    try {
        const {userId}=req.params;
        const user = await getUserById(userId);
        if(user){
            res.status(200).json(user);
        }else{
            res.status(404).json({error:"This user doesn't exist"});
        }
    } catch(error) {
        console.log(error);
        console.log("______________________");
        console.log(error.message);
        res.status(500).json({error:"There was an error while trying to get the user"});
    }
});




module.exports = router;