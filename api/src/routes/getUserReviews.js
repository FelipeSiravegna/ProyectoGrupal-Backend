const { Router } = require('express');
const router = Router()
const { Review } = require('../db');
const { Op } = require('sequelize');

router.get('/', async (req, res) => {
    const date = Date.now();
    const date24hs = date - 86400000;

    try {
        const reviews = await Review.findAll({
            where: {
                active: true,
                banned: false,
                createdAt: {
                    [Op.gte]: date24hs
                }
            }
        })

        if (reviews.length > 0) {
            res.status(200).json(reviews);
        } else {
            res.status(404).json({ error: "No se encontraron reviews" });
        }

    } catch (error) {
        console.log(error);
    }
})

module.exports = router;