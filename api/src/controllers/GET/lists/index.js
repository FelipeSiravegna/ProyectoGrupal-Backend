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

const getListByPk = async(listPk)=>await List.findByPk(listPk);

const getUserLists = async(userId)=>{
    const userLists = await User.findByPk(userId, {
        attributes:["id", "username", "image", "active", "banned"],
        through:{
            attributes:[]
        },
        include:{
            model:List,
            // where:{
            //     active:true
            // },
            attributes:["id", "name", "description", "active", "banned"],
            // through:{
            //     attributes:[]
            // }
        }
    });
    return userLists;
};

const getAvailableLists = async()=>await List.findAll({
     //used to render lists in client side search
    where:{
        active:true,
        banned:false
    }
});

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
    getListAndContent,
    getListByPk,
    getUserLists,
    getAvailableLists,
    getBannedLists, //admin purposes
    getInactiveLists, //admin purposes
    
}