const {User} = require('../../../db.js');
const {Op} = require('sequelize')


const userVerify = async (identificator,pass) => {
    const user = await User.findAll({
        where:{
            [Op.or]:[{username:identificator},{email:identificator}],
            password:pass
        },
        attributes:["username","id"],
    });
    return user;
};

module.exports=userVerify;

