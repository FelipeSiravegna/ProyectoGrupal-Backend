const { Review, User, Like } = require("../../db");
const { Op } = require("sequelize");

const getLikes = async (req, res) => {
  const { reviewId } = req.body;
  try {
    const { count } = await Like.findAndCountAll({
      where: {
        reviewId,
        like: true,
      },
    });
    res.json(count);
  } catch (error) {
    res.status(404).json({error});
  }
};

const postLikes = async (req, res) => {
  const { reviewId, userId, like } = req.body;
  try {
    const likeFind = await Like.findAll({
      where: {
        reviewId,
        userId,
      },
    });
    if (!likeFind.length) {
      await Like.create(req.body, {
        include: [Review, User],
      });
    } else {
      await Like.update(
        {
          like,
        },
        {
          where: {
            [Op.and]: [
              {
                reviewId,
              },
              {
                userId,
              },
            ],
          },
        }
      );
    }
    res.status(200).json("You like it");
  } catch (error) {
    res.status(404).json({
      error: error,
    });
  }
};

module.exports = {
  getLikes,
  postLikes,
};
