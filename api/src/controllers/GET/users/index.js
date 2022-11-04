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

const getUserByUsername_Email = async(username,email)=>await User.findOne({
    where:{
        username,email
    }
});

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
            banned:false,
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
    getUserByPk,
    getAllUserInfo, 
    getUserById, //works wrong after any user is updated. It sucks.
    getAvailableUsers,
    getAllActiveUsers, //admin purposes.
    getUserByUsername,
    getUserByEmail,
    getUserByUsername_Email,
    getUserByPassword, //admin purposes.
    getBannedUsers, //admin purposes.
    getDeletedUsers, //admin purposes.
    getPremiumUsers, //admin purposes.
    getFreeUsers, //admin purposes.
    
}