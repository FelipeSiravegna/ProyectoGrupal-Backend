const { Router } = require("express");
const router = Router();
const {deleteList} = require('../../../controllers/DELETE/List');

router.put('/list/:id', async (req, res) => {
    const {id} = req.params;
    try{
        const response = await deleteList(id);
        if(response === false){
            res.status(404).json({error: "List not found"});
        } else {
            res.status(200).json("List deleted successfully");
        }
    } catch (error){
        console.log(error.message);
    }
})

module.exports = router;