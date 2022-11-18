const { Router } = require("express");
const router = Router();
const { deleteReview } = require('../../../controllers/DELETE/Review');

router.put('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const response = await deleteReview(id);
        if (response === false) {
            res.status(404).json({ error: "Review not found" });
        } else {
            res.status(200).json("Review deleted successfully");
        }
    } catch (error) {
        console.log(error.message);
    }
})

module.exports = router;