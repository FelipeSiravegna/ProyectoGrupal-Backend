const { Router } = require("express");
const router = Router();
const getMercadoPagoInfo = require("../../../controllers/GET/mercadoPago/mercadoPagoInfo")
const { handlePremium } = require("../../../controllers/PUT/user/index")

router.post("/", async (req, res) => {
    const { id, topic } = req.query
    try {
        const MP_Response = await getMercadoPagoInfo(id, topic)
        console.log("MP_response", MP_Response.payer.email)
        const newPremiumUser = await handlePremium(MP_Response.payer.email)
        console.log("------", newPremiumUser)

        res.status(200).send("OK")
    } catch (error) {
        res.status(401).send(error.message)
    }
})

module.exports = router