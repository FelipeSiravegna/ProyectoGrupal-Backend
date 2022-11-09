const { Router } = require("express");
const router = Router();
const { getUserByPk } = require('../../../controllers/GET/users');

router.put('/follow', async (req, res) => {
    const { loggedUserId, userFollowedId } = req.body;

    try {
        if (loggedUserId === userFollowedId) {
            res.status(404).json({ error: "You can't follow yourself" });
        } else {
            const userFollowed = await getUserByPk(userFollowedId);
            const loggedUser = await getUserByPk(loggedUserId);

            if (!userFollowed || !loggedUser) {
                res.status(404), json({ error: "User not found" });
            } else {
                const newFollower = userFollowed.followers.concat(loggedUserId);
                const nowFollowing = loggedUser.following.concat(userFollowedId);

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
        }
    } catch (error) {
        console.log(error.message);
    }
})

router.put('/unfollow', async (req, res) => {
    const { loggedUserId, userUnfollowedId } = req.body;
    try {
        if (loggedUserId === userUnfollowedId) {
            res.status(404).json({ error: "You can't unfollow yourself" });
        } else {
            const userUnfollowed = await getUserByPk(userUnfollowedId);
            const loggedUser = await getUserByPk(loggedUserId);

            if (!userUnfollowed || !loggedUser) {
                res.status(404), json({ error: "User not found" });
            } else {
                const oneLessFollower = userUnfollowed.followers.filter((f) => f !== loggedUserId);
                const oneLessFollowing = loggedUser.following.filter((f) => f !== userUnfollowedId);

                if (oneLessFollower.length === userUnfollowed.followers.length || oneLessFollowing.length === loggedUser.following.length) {
                    res.status(404).json({ error: "You can't unfollow this user if you don't follow him/her first" })
                } else {
                    await userUnfollowed.update({
                        followers: oneLessFollower
                    });

                    await loggedUser.update({
                        following: oneLessFollowing
                    });

                    userUnfollowed.save();
                    loggedUser.save();

                    res.status(200).json({ message: "User unfollowed successfully!" });
                }
            }
        }
    } catch (error) {
        console.log(error.message);
    }
})
module.exports = router;