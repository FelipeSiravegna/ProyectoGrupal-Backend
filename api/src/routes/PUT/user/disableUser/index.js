const  { Router } = require("express");
const { setUserAsDeleted, deleteUser } = require("../../../../controllers/PUT/user");
const { getUserByPk } = require("../../../../controllers/GET/users");
const router = Router();

router.put("/:userId/disable", async (req, res) => {
    try {
        const {userId}=req.params;
        const setAsDeleted = await setUserAsDeleted(userId);
        if(!setAsDeleted){
            res.status(400).json({status:400, message:"There was a problem"});
        }else{
            res.status(setAsDeleted.status).json({status:setAsDeleted.status, message:setAsDeleted.message}); 
            // a year has 31536000000ms
            // a day has 86400000ms
            setTimeout(async()=>{
                const user = await getUserByPk(userId);
                if(!user){
                    console.log(`User (${userId}) doesn't exist`);
                }else{
                    await user.destroy();
                    console.log(`User "${user.username}" has been deleted`);
                }
            }, 10000);
        }
    } catch(error) {
        console.log(error);
        console.log("______________________");
        console.log("                ERROR: "+error.message);
        res.status(500).json({status:500, message:"There was an error while trying to delete the user."});
    }
});

module.exports = router