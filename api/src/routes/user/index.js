const  { Router } = require("express");
const router = Router();
const { getUser } = require("../../controllers/user");

router.post("/",async(req,res)=>{
    try {
        const { name, mail, password }=req.body;
        const existent = getUser(name, mail);
        if(!existent){
            res.status(200).json({success:true,message:`User ${name} created successfully`});
        }else{
            res.status(404).json({error:"There was an error while creating the user"});
        }
    } catch(error) {
        console.log(error);
        console.log("______________________");
        console.log(error.message);
    }
});

module.exports = router;