const { Router } = require("express");
const { getNowPlaying } = require('../../../controllers/GET/NowPlaying');
const router = Router();

router.get('/', async (req, res) => {
    try {
        const nowPlaying = await getNowPlaying();

        if (nowPlaying.length) {
            res.status(200).json(nowPlaying);
        } else {
            res.status(404).json({ error: "Now playing movies are not available" });
        }
    } catch (error) {
        console.log(error.message);
    }
})

module.exports = router;