const  { Router } = require("express");
const { getUserByNameOrEmail, getUserByEmail, getUserByUsername } = require("../../../controllers/GET/users");
const { createUser, isValidUsername, isValidEmail, isValidPassword,  } = require("../../../controllers/POST/user");
const router = Router();


router.post("/",async( req, res )=>{
    try {
        console.log("POST-->user");
        const { username, email, password }=req.body;
        const existingUsername = await getUserByUsername( username );
        const existingEmail = await getUserByEmail( email );
        const validateUser = function(username, email, password){
            const validation1=isValidUsername(username);
            if(validation1)return validation1;
            const validation2=isValidEmail(email);
            if(validation2)return validation2;
            const validation3=isValidPassword(password);
            if(validation3)return validation3;
        }(username, email, password);
        // console.log(existingEmail,existingUsername, validateUser);
        // res.send("meh")
        if(validateUser){
            res.status(400).json(validateUser);
        }
        else if(existingUsername) {
            res.status(409).json({success:false, message:`username already in use by another user.`});
        }
        else if(existingEmail){
            res.status(409).json({success:false, message:`email already in use by another user.`});
        }
        else{
            await createUser( username, email, password );
            res.status(200).json({success:true, message:`User ${username} created successfully.`})
        }
    } catch(error) {
        console.log(error);
        console.log("______________________");
        console.log(error.message);
    }
});


module.exports = router;
