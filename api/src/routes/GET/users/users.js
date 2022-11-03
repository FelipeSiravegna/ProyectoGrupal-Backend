const  { Router } = require("express");
const { getAvailableUsers } = require("../../../controllers/GET/users");
const router = Router();


router.get("/", async (req, res) => {
    try {
        const users = await getAvailableUsers();
        if(!users){
            res.status(500).json({status:500, message:"There was an error while trying to get the users"});
        }
        else if(!users.length){
            res.status(404).json({status:404, message:"No Users loaded in our data base"});
        }else{
            res.status(200).json(users);
        }
    } catch(error) {
        console.log(error);
        console.log("______________________");
        console.log(error.message);
        res.status(500).json({status:500, message:"There was an error while trying to get the users"});
    }
});




module.exports = router;