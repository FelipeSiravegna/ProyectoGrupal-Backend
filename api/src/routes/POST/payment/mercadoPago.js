const { Router } = require("express");
const router = Router();
const PaymentService= require("../../../controllers/POST/MercadoPago/paymentServices")


router.post("/",async (req,res)=>{
    const {email} = req.body
    console.log(email)
    try {
        const subscription = await PaymentService(email)
        return res.json(subscription)
    } catch (error) {
        console.log(error);

        return res.status(500).json({ error: true, msg: "Failed to create subscription" });
    }
})


module.exports=router