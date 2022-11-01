const { Router } = require("express");
const router = Router();
const {deleteDirector} = require('../../../controllers/DELETE/Director');

router.put('/:id', async (req, res) => {
    const {id} = req.params;

    try{
        const response = await deleteDirector(id);
        if(response === false){
            res.status(404).json({error: "Director not found"});
        } else {
            res.status(200).json("Director deleted successfully");
        }
    } catch (error){
        console.log(error.message);
    }
})

module.exports = router;