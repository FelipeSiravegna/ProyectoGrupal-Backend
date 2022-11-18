const { Router } = require("express");
const router = Router();
const { banActor } = require('../../../controllers/PUT/BanActor');

router.put('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const response = await banActor(id);
        if (response === false) {
            res.status(404).json({ error: "Actor not found" });
        } else {
            res.status(200).json("Actor banned successfully");
        }
    } catch (error) {
        console.log(error.message);
    }
})

module.exports = router;