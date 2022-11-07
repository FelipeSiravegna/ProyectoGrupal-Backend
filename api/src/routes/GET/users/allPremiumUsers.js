const  { Router } = require("express");
const router = Router();
const {getPremiumUsers} = require('../../../controllers/GET/users');

router.get('/', async (req, res) => {
    try{    
        const allPremiumUsers = await getPremiumUsers();
        if(allPremiumUsers.length){
            res.status(200).json(allPremiumUsers);
        } else {
            res.status(404).json({error: "There are no premium users available"});
        }
    } catch(error){
        console.log(error);
    }
})

module.exports = router;
