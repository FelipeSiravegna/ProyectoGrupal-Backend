const { Router } = require("express");
const router = Router();
const { getAllActiveUsers } = require('../../../controllers/GET/users');

router.get('/', async (req, res) => {
    try {
        const allActiveUsers = await getAllActiveUsers();
        if (allActiveUsers.length) {
            res.status(200).json(allActiveUsers);
        } else {
            res.status(404).json({ error: "There are no active users available" });
        }
    } catch (error) {
        console.log(error);
    }
})

module.exports = router;