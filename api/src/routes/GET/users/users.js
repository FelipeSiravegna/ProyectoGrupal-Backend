const  { Router } = require("express");
const { getUsers } = require("../../../controllers/GET/users");
const router = Router();


router.get("/", async (req, res) => {
    try {
        const users = await getUsers();
        if(users&&users.length){
            res.status(200).json(users);
        }else{
            res.status(404).json({error:"There was an error while trying to get the users"});
        }
    } catch(error) {
        console.log(error);
        console.log("______________________");
        console.log(error.message);
        res.status(500).json({error:"There was an error while trying to get the users"});
    }
});




module.exports = router;