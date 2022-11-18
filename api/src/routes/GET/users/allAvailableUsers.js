const { Router } = require("express");
const router = Router();
const { getAvailableUsers } = require('../../../controllers/GET/users');

router.get('/', async (req, res) => {
    try {
        const allAvailableUsers = await getAvailableUsers();
        if (allAvailableUsers.length) {
            res.status(200).json(allAvailableUsers);
        } else {
            res.status(404).json({ error: "There are no users available" });
        }
    } catch (error) {
        console.log(error);
    }
})

module.exports = router;