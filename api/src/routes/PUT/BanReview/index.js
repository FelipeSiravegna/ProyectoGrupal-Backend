const { Router } = require("express");
const router = Router();
const { banReview } = require('../../../controllers/PUT/BanReview');

router.put('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const response = await banReview(id);
        if (response === false) {
            res.status(404).json({ error: "Review not found" });
        } else {
            res.status(200).json("Review banned successfully");
        }
    } catch (error) {
        console.log(error.message);
    }
})

module.exports = router;