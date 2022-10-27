const { Router } = require("express");
const router = Router();
const {getMovieFromDB} = require("../../../controllers/GET/MovieDetail");


router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const movieDB = await getMovieFromDB(id);
    
    if(!movieDB){
      res.status(404).json({error: "Movie not found!"});
    } else {
      res.status(200).json(movieDB);
    }
    
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = router;