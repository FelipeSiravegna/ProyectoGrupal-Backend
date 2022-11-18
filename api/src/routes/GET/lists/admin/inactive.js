const { Router } = require("express");
const router = Router();
const { getInactiveLists } = require("../../../../controllers/GET/lists");

router.get("/inactive", async (req, res) => {
    try {
        const inactiveLists = await getInactiveLists();
        if (!inactiveLists) {
            res.status(500).json({ status: 500, message: "There was a problem while trying to get the inactive movie lists" });
        }
        else if (!inactiveLists.length) {
            res.status(404).json({ status: 404, message: "There aren't inactive movie lists" });
        }
        else {
            res.status(200).json(inactiveLists);
        }
    } catch (error) {
        console.log(error)
        console.log("_____________________________");
        console.log(error.message);
        res.status(500).json({ status: 500, message: "There was a problem while loading the inactive movie lists" });
    }
});

module.exports = router;