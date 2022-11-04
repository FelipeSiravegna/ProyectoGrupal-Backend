const { List, User, Movie } = require("../.././../db");

const getListByPk = async(listId)=>await List.findByPk(listId);

const getListWithMovies = async(listId)=>await List.findByPk(listId, {
    attributes:["id", "name", "description", "active", "banned"],
    through:{
        attributes:[]
    },
    include:{
        model:Movie,
        attributes:["id", "name", "image", "trailer", "active", "banned"],
        through:{
            attributes:[]
        }
    }
});

const getUserLists = async(userId)=>{
    const userLists = await User.findByPk(userId, {
        attributes:["id", "username", "image", "active", "banned"],
        through:{
            attributes:[]
        },
        include:{
            model:List,
            where:{
                active:true
            },
            attributes:["id", "name", "description", "active", "banned"],
            through:{
                attributes:[]
            }
        }
    });
    return userLists;
};

// Admin purposes controllers
const getAllDataLists = async()=>await List.findAll({
    exclude:{
        attributes:["password"],
        through:{attributes:[]}
    }
});

const getBannedLists = async()=>await List.findAll({
    where:{
        banned:true
    }
});

const getAvailableLists = async()=>await List.findAll({
    where:{
        active:true,
        banned:null
    }
});

module.exports={
    getListByPk,
    getListWithMovies,
    getUserLists,
    getAllDataLists, //admin purposes
    getBannedLists, //admin purposes
    getAvailableLists,
}