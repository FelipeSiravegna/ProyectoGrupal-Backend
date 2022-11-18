const { Router } = require("express");
const router = Router();
const { getAllUsers } = require('../../../controllers/GET/users');

router.get('/', async (req, res) => {
    try {
        const allUsers = await getAllUsers();
        if (allUsers.length) {
            res.status(200).json(allUsers);
        } else {
            res.status(404).json({ error: "There are no users available" });
        }
    } catch (error) {
        console.log(error);
    }
})

module.exports = router;