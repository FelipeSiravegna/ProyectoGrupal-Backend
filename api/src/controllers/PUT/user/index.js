let updatedData = {};

const updateUser = async(currentUserData, newUserData)=>{//newUserData is an object with the data updated by the user
    if(currentUserData){
        const updatedUserData = await currentUserData.set(newUserData);
        console.log(updatedUserData);
        const saveChanges = await updatedUserData.save();
        console.log(saveChanges);
        return saveChanges;
    }
}

// const checkNewUsername = (newUsername, oldUsername)=>{
//     if(newUsername&&newUsername!==""&&newUsername!==oldUsername)updatedData.username=newUsername;
// }
const checkNewUsername = (newUsername, oldUsername)=>{
    console.log("entra en el controlador");
    if (!newUsername || newUsername==="") {
        return {success:false, message:"username is needed."};
    }
    else if(newUsername.length>20||newUsername.length<1){
        return {success:false, message:"username must containt between 1 and 20 characters."};
    }
    else if(newUsername.split("").includes(" ")){
        return {success:false, message:"username can't containt spaces."};
    }
    else if(newUsername===oldUsername){
        return {success:false, message:"username is equal to the current one."};
    }
    else{
        updatedData.username=newUsername;
    }
}

// const checkNewEmail = (newEmail, oldEmail)=>{
//     if(newEmail&&newEmail!==""&newEmail!==oldEmail)
// }
const checkNewEmail = (newEmail, oldEmail)=>{
    if(!newEmail || newEmail==="") {
        return {success:false, message:"email is needed."};
    }
    else if (newEmail===oldEmail){
        return {success:false, message:"email is equal to the current one."};
    }else{
        updatedData.email=newEmail;
    }
}

// const checkNewPassword = (newPassword, oldPassword)=>{
//     if(newPassword&&newPassword!==""&&newPassword!==oldPassword)updatedData.password=newPassword;
// }
const checkNewPassword = (newPassword, oldPassword)=>{
    const validPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if(!newPassword || newPassword==="") {
        return {success:false, message:"password is needed."};
    }
    else if (newPassword==oldPassword){
        return {success:false, message:"password is equal to the current one."};
    }
    else if(!validPassword.test(newPassword) || newPassword.length>15){
        return{success:false, message:`The password must contain:\rBetween 8 and 15 characters\rOne or multiple numbers and special characters (@, $, !, %, *, ?, &)\rAt least a capital letter".`};
    }
    else{
        updatedData.password=newPassword;
    }
}




module.exports = {
    updateUser,
    checkNewUsername,
    checkNewEmail,
    checkNewPassword,
    updatedData,

}