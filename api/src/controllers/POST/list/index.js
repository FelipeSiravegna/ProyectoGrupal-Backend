const {List, followed_lists}=require("../../../db");
const { getUserLists, getListByPk } = require("../../GET/lists");
const { getUserByPk} = require("../../../controllers/GET/users");


const validateList = (name, description)=>{
    if(!name || !name===""){
        return{status:400, message:`The name is needed`};
    }
    else if(name.length>30){
        return{status:400, message:`The name can't be longer than 30 characters`}
    }
    if(description&&description.length>500){
        return{status:400, message:`The description can't be longer than 500 characters`}
    }
}

const createList = async(name, description, userId,ownerUserId)=>{
    const validation = validateList(name, description);
    if(validation){
        return validation;
    }else{
        const userID = parseInt(userId);
        const userLists = await getUserLists(userId);
        // userLists contains the user data and its movie lists
        if(!userLists.id){
            return{status:404, message:`This user doesn't exist or we had a problem to load the user data`};
        }
        else if(userLists.id&&!userLists.lists){
            return{status:404, message:`There was a problem to get the user movie lists`};
        }
            else{
                const user = await getUserByPk(userId);
                const newList = await List.create({name, description,ownerUserId});
                await newList.setUser(user);
                return{status:200, message:`The list ${name} has been created`};
            }
        }
    }


const followList = async (userId, listId)=>{
    const list = await getListByPk(listId);
    const user = await getUserByPk(userId);
    if(!list){
        return{status:404, message:`List not found`}
    }
    else if(!user){
        return{status:404, message:`There was a problem while loading the user data`}
    }
    await followed_lists.findOrCreate({where:{userId:user.id, listId:list.id}});
    return {status:200, message:`Now the user "${user.username}" follows the list "${list.name}"`};
}

const unfollowList = async (userId, listId)=>{
    const followedList = await followed_lists.findOne({where:{userId ,listId}});
    if(!followedList){
        return{status:404, message:`The user don't follow this list`}
    }
    await followedList.destroy();
    return {status:200, message:`List unfollowed`};
}

module.exports={
    validateList,
    createList,
    followList,
    unfollowList,

}
