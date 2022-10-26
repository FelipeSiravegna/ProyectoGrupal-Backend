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
        return {success:false, message:"username is needed."};
    }
    else if(username.length>20||username.length<1){
        return {success:false, message:"username must containt between 1 and 20 characters."};
    }
    else if(username.split("").includes(" ")){
        return {success:false, message:"username can't containt spaces."};
    }
}
const isValidEmail = (email)=>{
    if(!email || email==="") {
        return {success:false, message:"email is needed."};
    }
}
const isValidPassword = (password)=>{
    const validPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if(!password || password==="") {
        return {success:false, message:"password is needed."};
    }
    else if(!validPassword.test(password) || password.length>15){
        return{success:false, message:`The password must contain:\rBetween 8 and 15 characters\rOne or multiple numbers and special characters (@, $, !, %, *, ?, &)\rAt least a capital letter".`};
    }
}

module.exports={
    createUser,
    isValidUsername,
    isValidEmail,
    isValidPassword,

}