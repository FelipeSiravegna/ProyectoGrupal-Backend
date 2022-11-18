const { List, User, Movie, Director } = require("../../../db");

const getListAndContent = async (listId) => await List.findByPk(listId, {
    attributes: ["id", "name", "description", "banned", "active"],
    through: {
        attributes: []
    },
    include: [
        {
            model: Movie, attributes: ["id", "name", "image", "banned", "active"],
            include: { model: Director, attributes: ["id", "name", "banned", "active"] },
            through: { attributes: [] }
        },
        { model: User, attributes: ["id", "username", "image", "banned", "active"] },
    ]
});

const getListByPk = async (listPk) => await List.findByPk(listPk);

const getUserLists = async (userId) => {
    const userLists = await User.findByPk(userId, {
        attributes: ["id", "username", "image", "active", "banned"],
        through: {
            attributes: []
        },
        include: {
            model: List,
            as: "lists",
            attributes: ["id", "name", "description", "active", "banned"],
        }
    });
    return userLists;
};

const getFollwedLists = async (userId) => await User.findByPk(userId, {
    include: { model: List, as: "followedLists" }
});

const getAvailableLists = async () => await List.findAll({
    //used to render lists in client side search
    where: {
        active: true,
        banned: false
    },
    include: [
        {
            model: Movie, attributes: ["id", "name", "image"], through: { attributes: [] }
        },
        { model: User, as: "followedLists", attributes: ["id", "username", "image"], through: { attributes: [] } }]
});

const getActiveLists = async () => await List.findAll({
    where: { active: true }
});

const getBannedLists = async () => await List.findAll({
    where: { banned: true }
});

const getInactiveLists = async () => await List.findAll({
    where: { active: false },
})

module.exports = {
    getListAndContent,
    getListByPk,
    getUserLists,
    getAvailableLists,
    getActiveLists,
    getBannedLists, //admin purposes
    getInactiveLists, //admin purposes
    getFollwedLists
}