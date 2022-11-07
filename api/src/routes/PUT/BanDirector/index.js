const { Router } = require("express");
const router = Router();
const {banDirector} = require('../../../controllers/PUT/BanDirector');

router.put('/:id', async (req, res) => {
    const {id} = req.params;

    try{
        const response = await banDirector(id);
        if(response === false){
            res.status(404).json({error: "Director not found"});
        } else {
            res.status(200).json("Director banned successfully");
        }
    } catch (error){
        console.log(error.message);
    }
})

module.exports = router;