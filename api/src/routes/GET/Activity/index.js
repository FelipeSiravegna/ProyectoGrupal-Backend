const { Router } = require("express");
const router = Router();
const {User, List, Review, Movie} = require('../../../db');
const {Op} = require('sequelize');

router.get('/:loggedUser', async (req, res) => {
    const {loggedUser} = req.params
    const user = await User.findByPk(loggedUser);
    const users = user.following;
    const activity = [];
    const date = Date.now();
    const date72hs = date - 259200000

    try {
        console.log(users)
        for(let i = 0; i < users.length; i++){
            //Todas las reviews que hayan sido creadas o modificadas en las últimas 72 horas
            const newReviews = await Review.findAll({
                where: {
                    userId: users[i],
                    [Op.or]: [
                        {createdAt: {
                            [Op.gte]: date72hs
                        }},
                        {updatedAt: {
                            [Op.gte]: date72hs
                        }}
                    ],
                    active: true,
                    banned: false
                }
            })

            if(newReviews.length > 0){
                for(let j = 0; j < newReviews.length; j++){
                    const movieName = await Movie.findByPk(newReviews[j].movieId);
                    const userName = await User.findByPk(newReviews[j].userId);

                    const review = {
                        id: newReviews[j].id,
                        content: newReviews[j].content,
                        createdAt: newReviews[j].createdAt,
                        updatedAt: newReviews[j].updatedAt,
                        movieName: movieName.name,
                        movieId: newReviews[j].movieId,
                        userId: newReviews[j].userId,
                        userName: userName.username,
                        type: "review"
                    }

                    activity.push(review);
                }
            }

            //Todas las listas que fueron creadas o actualizadas en las últimas 72 horas
            const newLists = await List.findAll({
                where: {
                    userId: users[i],
                    [Op.or]: [
                        {createdAt: {
                            [Op.gte]: date72hs
                        }},
                        {updatedAt: {
                            [Op.gte]: date72hs
                        }}
                    ],
                    active: true,
                    banned: false
                }
            })

            if(newLists.length > 0){
                for(let k = 0; k < newLists.length; k++){
                    const userName = await User.findByPk(newLists[k].userId);

                    const list = {
                        id: newLists[k].id,
                        name: newLists[k].name,
                        userId: newLists[k].userId,
                        userName: userName.username,
                        createdAt: newLists[k].createdAt,
                        updatedAt: newLists[k].updatedAt,
                        type: "list"
                    }

                    activity.push(list);
                }
            }
        }

        if(activity.length === 1){
            //Devuelvo el array de activity
            res.status(200).json(activity);
        } else if(activity.length > 1){
            //Devuelvo el arreglo de activity sorted
            let sortedActivity = activity.sort((a, b) => a.updatedAt > b.updatedAt);
            res.status(200).json(sortedActivity);
        } else{
            res.status(404).json({error: "There is no activity available"});
        }

    } catch(error){
        console.log(error)
    }
})

module.exports = router;
