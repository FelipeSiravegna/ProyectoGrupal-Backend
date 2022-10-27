const  { Router } = require("express");
// const { getUserByNameOrEmail, getUserByEmail, getUserByUsername, getUserById } = require("../../../controllers/GET/users");
// const { checkNewUsername, checkNewEmail, checkNewPassword, updateUser, updatedData } = require("../../../controllers/PUT/user");
const usernameUpdate = require("./username");
const emailUpdate = require("./email");
const passwordUpdate = require("./password");
const router = Router();


router.put("/update", usernameUpdate);

// , emailUpdate, passwordUpdate

// async (req, res) => {
//     try {
//         console.log("PUT-->user");
//         if(Object.keys(updatedData).length){
//             await updateUser(currentUserData, updatedData);
//             res.status(200).json({success:true, message:`user data updated`});
//         }else{
//             res.status(404).json({error:"There was an error while trying to update the user"});
//         }

//     } catch(error) {
//         console.log(error);
//         console.log("______________________");
//         console.log("                ERROR: "+error.message);
//         res.status(404).json({error:"There was an error while trying to update the user"});
//     }
// }


module.exports = router;
