const { User } = require('../../../db');

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

const getUsers = async()=>{
    console.log("Controller getUsers")
    const users = await User.findAll({
        where:{
            banned:!true
        }
    });
    console.log(users);
    return users;
}



module.exports={
    getUserById,
    getUserByNameOrEmail,
    getUsers,

}