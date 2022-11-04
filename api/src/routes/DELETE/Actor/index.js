const { Router } = require("express");
const router = Router();
const {deleteActor} = require('../../../controllers/DELETE/Actor');

router.put('/:id', async (req, res) => {
    const {id} = req.params;

    try{
        const response = await deleteActor(id);
        if(response === false){
            res.status(404).json({error: "Actor not found"});
        } else {
            res.status(200).json("Actor deleted successfully");
        }
    } catch (error){
        console.log(error.message);
    }
})

module.exports = router;