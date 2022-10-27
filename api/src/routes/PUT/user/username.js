const  { Router } = require("express");
const { getUserById } = require("../../../controllers/GET/users");
const { checkNewUsername, updateUser, updatedData } = require("../../../controllers/PUT/user");
const router = Router();


router.put("/username/:userId", async (req, res) => {
    try {
        console.log("PUT-->username");
        const { userId } = req.params;
        const { username } = req.body;

        const currentUserData = await getUserById(userId);
        const validate = function(username){
            checkNewUsername(username, currentUserData.username);
        }(username);
        console.log(validate);
        if(Object.keys(updatedData).length&&!validate){
            await updateUser(currentUserData, updatedData);
            res.status(200).json({success:true, message:`user name updated`});
        }else{
            res.status(404).json(validate);
        }

    } catch(error) {
        console.log(error);
        console.log("______________________");
        console.log("                ERROR: "+error.message);
        res.status(500).json({success:false, message:"There was an error while trying to update the username."});
    }
});




module.exports = router;