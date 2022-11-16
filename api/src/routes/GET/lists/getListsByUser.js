const { Router } = require("express");
const router = Router();
const {List, User} = require('../../../db');

router.get('/:userId', async (req, res) => {
    const {userId} = req.params;
    try{
        const lists = await List.findAll({
            where: {
                userId: userId,
                active: true
            }
        })

        if(!lists){
            res.status(404).json({error: "There was a problem getting the lists from the user"});
        } else if(lists.length === 0){
            res.status(200).json({message: "The user has no lists created"});
        } else {
            res.status(200).json(lists);
        }
    } catch(error){
        console.log(error);
    }
})

module.exports = router;