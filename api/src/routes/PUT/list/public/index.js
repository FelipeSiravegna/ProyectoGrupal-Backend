const { Router } = require("express");
const router = Router();
const addMovieToList = require("./addMovieToList");
const updateListData = require("./updateListData");

router.use("/", updateListData, addMovieToList);

module.exports = router;