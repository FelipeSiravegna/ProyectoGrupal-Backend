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
    const {content, userId, movieId}=req.body;
    if(!content){
      res.status(400).json({mensaje:"Is not possible to make an empty comment"});
    }
    else if(content.length>1000){
      res.status(400).json({mensaje:"The review is too long. (Max characters allowed: 1000)"});
    }
    else if(!(userId&&movieId)){
      res.status(400).json({mensaje:"Is not possible to post the review because there's missing data"});
    }else{
      await Review.create(req.body, {
        include: [Movie, User],
      });
      res.json({mensaje:"done"});
    }
  } catch (error) {
    console.log(error);
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
