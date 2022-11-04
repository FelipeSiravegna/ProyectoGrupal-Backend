const { List, User, Movie } = require("../.././../db");

const getListAndContent = async(listId)=>await List.findByPk(listId, {
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

const getAvailableLists = async()=>await List.findAll({
     //used to render lists in client side search
    where:{
        active:true,
        banned:false
    }
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



const getAllListsAllData = async()=>await List.findAll();

const getListAllData = async(listId)=>await List.findByPk(listId);

const getBannedLists = async()=>await List.findAll({
    where:{
        banned:true
    },
    exclude:{
        attributes:["password"]
    }
});

const getInactiveLists = async()=>await List.findAll({
    where:{
        active:false
    },
    exclude:{
        attributes:["password"]
    }
})

module.exports={
    getUserListS,
    getAvailableLists,
    getListAndContent,
    getAllListsAllData,
    getListAllData,
    getBannedLists, //admin purposes
    getInactiveLists, //admin purposes

}
