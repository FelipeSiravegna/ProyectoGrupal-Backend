const { User } = require('../../../db');
const { Op } = require('sequelize');


const getUserById = async(userId)=>{
    const user = await User.findOne({
        wher:{
            id:userId
        }
    });
    return user;
}

const getUserByNameOrEmail = async (username, email)=>{
    const user = await User.findOne({
        where:{
            [Op.or]:[ { username:username }, {email:email} ]
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
    getUserByNameOrEmail,
    getUsers,
    getUserByUsername,
    getUserByEmail,

}