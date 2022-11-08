const JWT = require("jsonwebtoken")
const  { Router } = require("express");
const router = Router(); 
const userVerify = require("../../../controllers/POST/user/userFLogin")

router.get("/",async (req,res,)=>{
    const {identificator,pass} = req.body
    try {
        const user = await userVerify(identificator,pass)
        if (user){
            JWT.sign({user:user},"secretkey",(err,token)=>{
                res.status(200).json({token:token})
            })
        } else {
            res.status(404).json("Usuario o Contraseña incorrectos")
        }
    } catch (error) {
        console.log(error);
        console.log("___________________");
        console.log(error.message);
        res.status(500).json({status:500, message:"There was a problem while trying to get the user info"});
    }
})


module.exports=router

