const { Review, Movie, User } = require("../../db");

const getComments = async (req, res) => {

  const {movieId} = req.body
  try {

    const review = await Review.findAll({ include: { all: true },

      where:{
        active: true,
      }
    });
    res.json(review);
  } catch (error) {
    res.status(404).json({ error: error });
  }
};

const postComments = async (req, res) => {
  try {
    await Review.create(req.body, {
      include: [Movie, User],
    });
    res.json({mensaje:"done"})
  } catch (error) {
    res.status(404).json({ error: error });
  }
};

const deletePost=async(req, res)=>{
  const {id} = req.params

  try {
    await Review.update({active: false},
      {where:{
        id:id
      }})
      res.json("The Review has been deleted")
  } catch (error) {
    res.status(404).json({error:error})
  }

}
module.exports = { getComments, postComments, deletePost };
