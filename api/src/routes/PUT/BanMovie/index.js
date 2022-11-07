const { Router } = require("express");
const router = Router();
const {banMovie} = require('../../../controllers/PUT/BanMovie');

router.put('/:id', async (req, res) => {
    const {id} = req.params;

    try{
        const response = await banMovie(id);
        if(response === false){
            res.status(404).json({error: "Movie not found"});
        } else {
            res.status(200).json("Movie banned successfully");
        }
    } catch (error){
        console.log(error.message);
    }
})

module.exports = router;