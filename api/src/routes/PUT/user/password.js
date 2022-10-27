const  { Router } = require("express");
const { getUserByNameOrEmail, getUserByEmail, getUserByUsername, getUserById } = require("../../../controllers/GET/users");
const { checkNewPassword, updateUser, updatedData } = require("../../../controllers/PUT/user");
const router = Router();


router.put("/password/:userId", async (req, res) => {
    try {
        console.log("PUT-->password");
        const { userId } = req.params;
        const { password } = req.body;

        const currentUserData = await getUserById(userId);
        const validate = function(password){
            checkNewPassword(password, currentUserData.password);
        }(password);

        if(Object.keys(updatedData).length&&!validate){
            await updateUser(currentUserData, updatedData);
            res.status(200).json({success:true, message:`user password updated`});
        }else{
            res.status(404).json(validate);
        }

    } catch(error) {
        console.log(error);
        console.log("______________________");
        console.log("                ERROR: "+error.message);
        res.status(500).json({success:false, message:"There was an error while trying to update the password."});
    }
});




module.exports = router;