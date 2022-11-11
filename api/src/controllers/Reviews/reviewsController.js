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
    const {user, movie}=req.query;
    //user= the user's id who's doing the review | movie= the movie's id that the user is revewing
    const { content, userNickName, userImage } = req.body;
    if(!(user&&movie)){
      console.log("user and/or movie queries aren't present in the route");
      res.status(400).json({mensaje:"Oh, no! There's missing info"});
    }
    else if(!(userNickName&&userImage)){
      console.log("userNickName & userImage are mandatory");
      res.status(400).json({mensaje:"Oh, no! There's missing info"});
    }
    else if(userImage.length>10000){
      res.status(400).json({mensaje:"The image route is too long (Max characters allowed: 10 000)"});
    }
    else if(!content){
      res.status(400).json({mensaje:"Is not possible to make an empty comment"});
    }
    else if(content.length>1000){
      res.status(400).json({mensaje:"The review is too long. (Max characters allowed: 1000)"});
    }else{
      await Review.create({content, userNickName, userImage, userId:user, movieId:movie});
      res.status(200).json({mensaje:"Review posted successfully"});
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "There was a problem while loading the data" });
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
