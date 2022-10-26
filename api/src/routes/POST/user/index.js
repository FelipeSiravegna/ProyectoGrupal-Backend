const  { Router } = require("express");
const { getUser } = require("../../controllers/POST/user");
const { createUser } = require("../../controllers/POST/user");
const router = Router();


router.post("/",async( req, res )=>{
    try {
        const { username, email, password }=req.body;
        const existent = getUser( username, email );
        switch( username, email, password ){
            case !username: {
                res.status(400).json({success:false, message:"username is needed."});
                break;
            }
            case !email: {
                res.status(400).json({success:false, message:"email is needed."});
                break;
            }
            case !password: {
                res.status(400).json({success:false, message:"password is needed."});
                break;
            }
            case existent: {
                res.status(409).json({success:false, message:`email or username are already in use by another user.`});
                break;
            }
            default:{
                await createUser( username, email, password );
                res.status(200).json({success:true, message:`User ${username} created successfully.`});
            }
        }
    } catch(error) {
        console.log(error);
        console.log("______________________");
        console.log(error.message);
    }
});

module.exports = router;