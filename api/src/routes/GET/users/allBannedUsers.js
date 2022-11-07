const  { Router } = require("express");
const router = Router();
const {getBannedUsers} = require('../../../controllers/GET/users');

router.get('/', async (req, res) => {
    try{    
        const allBannedUsers = await getBannedUsers();
        if(allBannedUsers.length){
            res.status(200).json(allBannedUsers);
        } else {
            res.status(404).json({error: "There are no banned users available"});
        }
    } catch(error){
        console.log(error);
    }
})

module.exports = router;
