const  { Router } = require("express");
const router = Router();
const { getUserByNameOrEmail, getUserByEmail, getUserByUsername, getUserById } = require("../../../controllers/GET/users");


router.put("/update/:username", async (req, res) => {
    try {
        const { username } = req.params;
        const user = await getUserByUsername(username);
        if(user){
            res.status(200).json(user);
        }else{
            res.status(404).json({error:"There was an error while trying to get the user"});
        }
    } catch(error) {
        console.log(error);
        console.log("______________________");
        console.log(error.message);
    }
});




module.exports = router;