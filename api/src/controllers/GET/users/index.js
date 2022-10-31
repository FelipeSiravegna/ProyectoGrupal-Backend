const { User, List, Movies } = require('../../../db');

const getUserByPk = async(pk)=>await User.findByPk(pk);

const getUserByPkInclude = async(userId, modelName)=>{
    const user = await User.findByPk(userId, {
        include:{
            modelName
        }
    });
    return user;
}

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

const getBannedUsers = async ()=> await User.findAll({
    where:{
        banned:true
    }
});

const getAllUserInfo = async (userId)=>{
    const userData = await User.findByPk(userId, {
        include:{
            model:List,
            include:{
                model:Movies
            }
        }
    });
    return userData;
}


module.exports={
    getUserByPk,
    getUserByPkInclude,
    getUserById,
    getUsers,
    getUserByUsername,
    getUserByEmail,
    getUserByPassword,
    getBannedUsers,
    getAllUserInfo,
    
}
