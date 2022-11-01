const { User } = require("../../../db");

const createUser = async(username, email, password)=>{
        User.findOrCreate({
            where:{
                username, email
            },
            defaults:{
                username, email, password
            }
        });
}

const isValidUsername = (username)=>{
    if (!username || username==="") {
        return {status:400, message:"username is needed."};
    }
    else if(username.length>20||username.length<1){
        return {status:400, message:"username must containt between 1 and 20 characters."};
    }
    else if(username.split("").includes(" ")){
        return {status:400, message:"username can't containt spaces."};
    }
}
const isValidEmail = (email)=>{
    if(!email || email==="") {
        return {status:400, message:"email is needed."};
    }
}
const isValidPassword = (password)=>{
    const validPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if(!password || password==="") {
        return {status:400, message:"password is needed."};
    }
    else if(!validPassword.test(password) || password.length>15){
        return{status:400, message:`The password must contain:\rBetween 8 and 15 characters\rOne or multiple numbers and special characters (@, $, !, %, *, ?, &)\rAt least a capital letter".`};
    }
}

module.exports={
    createUser,
    isValidUsername,
    isValidEmail,
    isValidPassword,

}
