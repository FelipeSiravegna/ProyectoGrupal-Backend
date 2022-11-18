const { Router } = require("express");
const router = Router();
const { getFreeUsers } = require('../../../controllers/GET/users');

router.get('/', async (req, res) => {
    try {
        const allFreeUsers = await getFreeUsers();
        if (allFreeUsers.length) {
            res.status(200).json(allFreeUsers);
        } else {
            res.status(404).json({ error: "There are no free users available" });
        }
    } catch (error) {
        console.log(error);
    }
})

module.exports = router;