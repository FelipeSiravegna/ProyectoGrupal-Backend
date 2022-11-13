const { Router } = require("express");
const router = Router();
const { getUserByPk } = require('../../../controllers/GET/users');

router.put('/follow', async (req, res) => {
    const { loggedUserId, followedUserId } = req.body;
    console.log("LOGGED USER ID: ", loggedUserId);
    console.log("FOLLOWED USER ID: ", followedUserId);
    try {
        if (loggedUserId !== followedUserId) {
            const userFollowed = await getUserByPk(followedUserId);
            const loggedUser = await getUserByPk(loggedUserId);

            if (!userFollowed) {
                res.status(404).json({ error: "User followed not found" });
            } else if(!loggedUser){
                res.status(404).json({ error: "Logged user not found" });
            } else {
                const newFollower = userFollowed.followers.concat(loggedUserId);
                const nowFollowing = loggedUser.following.concat(followedUserId);

                await userFollowed.update({
                    followers: newFollower
                });

                await loggedUser.update({
                    following: nowFollowing
                });

                userFollowed.save();
                loggedUser.save();

                res.status(200).json({ message: "User followed successfully!" });
            }
        } else {
            res.status(404).json({ error: "You can't follow yourself" });
        }
    } catch (error) {
        console.log(error.message);
    }
})

router.put('/unfollow', async (req, res) => {
    const { loggedUserId, unfollowedUserId } = req.body;
    console.log("LOGGED USER ID: ", loggedUserId);
    console.log("UNFOLLOWED USER ID: ", unfollowedUserId);
    try {
        if (loggedUserId === unfollowedUserId) {
            res.status(404).json({ error: "You can't unfollow yourself" });
        } else {
            const userUnfollowed = await getUserByPk(unfollowedUserId);
            const loggedUser = await getUserByPk(loggedUserId);

            if (!userUnfollowed) {
                res.status(404).json({ error: "UNFOLLOWED USER NOT FOUND" });
            } else if (!loggedUser) {
                res.status(404).json({ error: "LOGGED USER NOT FOUND" })
            } else {
                const oneLessFollower = userUnfollowed.followers.filter((f) => f !== loggedUserId);
                const oneLessFollowing = loggedUser.following.filter((f) => f !== unfollowedUserId);

                await userUnfollowed.update({
                    followers: oneLessFollower
                });

                await loggedUser.update({
                    following: oneLessFollowing
                });

                await userUnfollowed.save();
                await loggedUser.save();

                res.status(200).json({ message: "User unfollowed successfully!" });

            }
        }
    } catch (error) {
        console.log(error.message);
    }
})
module.exports = router;