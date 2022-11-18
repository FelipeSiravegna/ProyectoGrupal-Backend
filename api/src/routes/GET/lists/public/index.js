const { Router } = require("express");
const router = Router();
const { getAvailableLists, getListAndContent, getFollwedLists } = require("../../../../controllers/GET/lists");

router.get("/", async (req, res) => {
    try {
        const lists = await getAvailableLists();
        if (!lists) {
            res.status(500).json({ status: 500, message: "There was a problem while trying to get the movie lists" });
        }
        else {
            res.status(200).json(lists);
        }
    } catch (error) {
        console.log(error)
        console.log("_____________________________");
        console.log(error.message);
        res.status(500).json({ status: 500, message: "There was a problem while loading the user movie lists" });
    }
});

router.get("/list/:listId", async (req, res) => {
    try {
        const { listId } = req.params;
        if (listId) {
            const list = await getListAndContent(listId);
            if (!list) {
                res.status(404).json({ status: 404, message: "This list doesn't exist" });
            }
            else {
                res.status(200).json(list);
            }
        }
    } catch (error) {
        console.log(error)
        console.log("_____________________________");
        console.log(error.message);
        res.status(500).json({ status: 500, message: "There was a problem while loading the user movie lists" });
    }
});

router.get("/followedLists/:userId", async (req, res) => {
    try {
        const { userId } = req.params;
        if (userId) {
            const userData = await getFollwedLists(userId);
            if (!userData) {
                res.status(404).json({ status: 404, message: "This user doesn't exist" });
            }
            else if (!userData.followedLists) {
                res.status(500).json({ status: 500, message: "There was a problem while loading the followed lists" });
            }
            else if (!userData.followedLists.length) {
                res.status(404).json({ status: 404, message: `The user "${userData.username}" doesn't follow any movie list` });
            }
            else {
                res.status(200).json(userData);
            }
        }
    } catch (error) {
        console.log(error)
        console.log("_____________________________");
        console.log(error.message);
        res.status(500).json({ status: 500, message: "There was a problem while loading the user followed lists" });
    }
});

module.exports = router;