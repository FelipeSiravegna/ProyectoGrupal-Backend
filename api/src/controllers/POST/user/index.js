const { User } = require("../../../db");
const { getUserByNameOrEmail } = require("../../GET/users");

const createUser = async(username, email, password)=>{
    const existingUser = await getUserByNameOrEmail(username, email);
    if(!existingUser){
        User.create({
            username, email, password 
        })
    }
}

module.exports={
    createUser,
    
}