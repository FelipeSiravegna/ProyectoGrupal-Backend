const  { Router } = require("express");
const { getUserByPk } = require("../../../controllers/GET/users");
const router = Router();

router.delete("/:userId", async (req, res) => {
    try {
        const {userId}=req.params;
        const user = getUserByPk(userId);
        if(!user){
            res.status(400).json({status:400, message:"This user doesn't exist"});
        }
        await user.destroy();
        res.status(200).json({status:200, message:`User ${user.username} deleted`});
    } catch(error) {
        console.log(error);
        console.log("______________________");
        console.log("                ERROR: "+error.message);
        res.status(500).json({success:false, message:"There was an error while trying to delete the user."});
    }
});

module.exports = router
