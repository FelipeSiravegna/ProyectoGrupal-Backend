const JWT = require("jsonwebtoken")
const  { Router } = require("express");
const router = Router(); 
const userVerify = require("../../../controllers/POST/user/userFLogin")

router.post("/",async (req,res,next)=>{
    const {identificator,pass} = req.body
    try {
        const user = await userVerify(identificator,pass)
        if (user.length !== 0){
            JWT.sign({user:user},"secretkey",(err,token)=>{
                res.status(200).json({token:token})
            })
        } else {
            res.status(404).json("Usuario o Contraseña incorrectos")
        }
    } catch (error) {
        res.status(404).send(error.message)
    }
})


module.exports=router

