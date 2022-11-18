const { Router } = require("express");
const router = Router();
const { getActiveDirectors } = require('../../../controllers/GET/Directors');

router.get("/", async (req, res) => {
  try {
    const directors = await getActiveDirectors();

    if (!directors) {
      res.status(404).json({ error: "There are no active directors!" });
    } else {
      res.status(200).json(directors);
    }
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = router;