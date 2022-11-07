const {List}=require("../../../db");
const { getUserListS } = require("../../GET/lists");
const { getUserByPk } = require("../../../controllers/GET/users");


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

const createList = async(name, description, userId)=>{
    const validation = validateList(name, description);
    if(validation){
        return validation;
    }else{
        const userID = parseInt(userId);
        const userLists = await getUserListS(userId);
        // userLists contains the user data and its movie lists
        if(!userLists.id){
            return{status:404, message:`This user doesn't exist or we had a problem to load the user data`};
        }
        else if(userLists.id&&!userLists.lists){
            return{status:404, message:`There was a problem to get the user movie lists`};
        }
        else{
            const existingLists = userLists.lists.map(list=>list.name);
            if(existingLists.includes(name)){
                return{status:403, message:`The user ${userLists.username} already has a list named "${name}"`};
            }else{
                const user = await getUserByPk(userId);
                const newList = await List.create({name, description});
                await newList.setUser(user);
                return{status:200, message:`The list ${name} has been created`};
            }
        }
    }
}

module.exports={
    validateList,
    createList,

}
