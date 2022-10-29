const { getUserByUsername, getUserByEmail } = require("../../GET/users");

const checkNewUsername = async(currentUsername, newUsername)=>{
    const existingUsername = await getUserByUsername(newUsername);
    if (newUsername==="") {
        return {status:400,  message:"username is needed."};
    }
    else if(newUsername.split("").includes(" ")){
        return {status:400,  message:"username can't containt spaces."};
    }
    else if(currentUsername===newUsername){
        return {status:403,  message:"username is equal to the current one."};
    }
    else if(!(currentUsername.length>1&&newUsername.length<20)){
        return {status:400,  message:"username must containt between 1 and 20 characters."};
    }
    else if (existingUsername){
        return {status:403, message:"this username belongs to another user."};
    }
    else{
        console.log("username aproved");
    }
}

const checkNewEmail = async ( currentEmail, newEmail )=>{
    const existingEmail = await getUserByEmail(newEmail);
    if(newEmail==="") {
        return {status:400, message:"email is needed."};
    }
    else if (currentEmail===newEmail){
        return {status:403, message:"email is equal to the current one."};
    }
    else if(!(newEmail.length>1 && newEmail.length<30)){
        return {status:400,  message:"email must containt between 1 and 30 characters."};
    }
    else if(existingEmail){
        return {status:403, message:"this email is used by another user."};
    }
    else{
        console.log("email aproved");
    }
}

const checkNewPassword = ( currentPassword,  newPassword)=>{
    const validPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    console.log(`current password:${currentPassword} | new password:${newPassword}`);
    if(newPassword==="") {
        return {status:400, message:"password is needed."};
    }
    else if(!(newPassword.length>8 && newPassword.length<30)){
        return {status:400, message:`password has more than 30 characters`}
    }
    else if(!validPassword.test(newPassword) ){
        return{status:400, message:`The password must contain:\rBetween 8 and 15 characters\rOne or multiple numbers and special characters (@, $, !, %, *, ?, &)\rAt least a capital letter".`};
    }
    else if (currentPassword===newPassword){
        return {status:403, message:"password is equal to the current one."};
    }
    else{
        console.log("password aproved");
    }
}




module.exports = {
    checkNewUsername,
    checkNewEmail,
    checkNewPassword,

}
