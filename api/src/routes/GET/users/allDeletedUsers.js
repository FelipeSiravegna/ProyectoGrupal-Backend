const  { Router } = require("express");
const router = Router();
const {getDeletedUsers} = require('../../../controllers/GET/users');

router.get('/', async (req, res) => {
    try{    
        const allDeletedUsers = await getDeletedUsers();
        if(allDeletedUsers.length){
            res.status(200).json(allDeletedUsers);
        } else {
            res.status(404).json({error: "There are no deleted users available"});
        }
    } catch(error){
        console.log(error);
    }
})

module.exports = router;
