const { User } = require('../../../db');

const getUserByPk = async(pk)=>await User.findByPk(pk);

const getUserById = async(userId)=>{
    const user = await User.findOne({
        wher:{
            id:userId
        }
    });
    return user;
}

const getUserByUsername = async (username)=>{
    const user = await User.findOne({
        where:{
            username:username
        }
    });
    return user;
}

const getUserByEmail = async (email)=>{
    const user = await User.findOne({
        where:{
            email:email
        }
    });
    return user;
}

const getUserByPassword = async (password)=>{
    const user = await User.findOne({
        where:{
            password:password
        }
    });
    return user;
}

const getUsers = async()=>{
    const users = await User.findAll({
        where:{
            banned:null
        }
    });
    return users;
}



module.exports={
    getUserById,
    getUsers,
    getUserByUsername,
    getUserByEmail,
    getUserByPassword,
    
}
