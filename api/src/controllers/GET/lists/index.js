const { List, User, Movie } = require("../.././../db");

const getAllLists = async()=>await List.findAll({
    attributes:["id", "name", "description"],
    through:{
        attributes:[]
    },
});

const getUserListS = async(userId)=>{
    const userLists = await User.findByPk(userId, {
        attributes:["id", "username"],
        through:{
            attributes:[]
        },
        include:{
            model:List,
            attributes:["id", "name", "description"],
            // through:{
            //     attributes:[]
            // }
        }
    });
    return userLists;
};

const getList = async(listId)=>await List.findByPk(listId, {
    attributes:["id", "name", "description"],
    through:{
        attributes:[]
    },
    include:{
        model:Movie,
        attributes:["id", "name", "image"],
        through:{
            attributes:[]
        }
    }
});

const getAllListsAllData = async()=>await List.findAll();

const getListAllData = async(listId)=>await List.findByPk(listId);

const getBannedLists = async()=>await List.findAll({
    where:{
        banned:true
    }
});

module.exports={
    getUserListS,
    getAllLists,
    getList,
    getAllListsAllData,
    getListAllData,
    getBannedLists,
    
}