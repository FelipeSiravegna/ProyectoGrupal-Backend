const { User, List, Movie } = require('../../../db');

const getUserByPk = async(pk)=>await User.findByPk(pk);

const getAllUserInfo = async(userId)=>{
    const userData = await User.findByPk(userId,{
        include:{
            model: List,
            include: Movie
        }
    });
    return userData;
}

const getUserById = async(userId)=>{
    const user = await User.findOne({
        wher:{
            id:userId,
            active:true
        }
    });
    return user;
}

const getUserByUsername = async (username)=>{
    const user = await User.findOne({
        where:{
            username:username,
            active:true
        }
    });
    return user;
}

const getUserByEmail = async (email)=>{
    const user = await User.findOne({
        where:{
            email:email,
            active:true
        }
    });
    return user;
}

const getUserByPassword = async (password)=>{
    const user = await User.findOne({
        where:{
            password:password,
            active:true

        }
    });
    return user;
}

const getAvailableUsers = async()=>{
    const users = await User.findAll({
        where:{
            banned:null,
            active:true
        }
    });
    return users;
}

const getAllActiveUsers = async()=>await User.findAll({
    where:{
        active:true
    }
});

const getBannedUsers = async ()=> await User.findAll({
    where:{
        banned:true,
        active:true
    }
});

const getDeletedUsers = async ()=>await User.findAll({
    where:{
        active:false
    }
});

const getPremiumUsers = async ()=>await User.findAll({
    where:{
        premium:true
    }
});

const getFreeUsers = async ()=> await User.findAll({
    where:{
        premium:false
    }
});


module.exports={
    getUserByPk, //info revealing only for admins
    getAllUserInfo, 
    getUserById,
    getAvailableUsers,
    getAllActiveUsers, //admin purpuses
    getUserByUsername,
    getUserByEmail,
    getUserByPassword, //admin purpuses
    getBannedUsers, //admin purpuses
    getDeletedUsers, //admin purpuses
    getPremiumUsers,
    getFreeUsers,
    
}