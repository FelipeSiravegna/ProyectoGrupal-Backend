const { Router } = require("express");
const router = Router();
const { updateReview } = require('../../../controllers/PUT/UpdateReview');

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { newContent } = req.body;

    try {
        const response = await updateReview(id, newContent);
        if (response === false) {
            res.status(404).json({ error: "Review not found" });
        } else {
            res.status(200).json("Review udpated successfully");
        }
    } catch (error) {
        console.log(error.message);
    }
})

module.exports = router;