const { Router } = require("express");
const router = Router();
const { handlePremium } = require("../../../controllers/PUT/user/index")

/* router.put("/", async (req, res)=>{
    try{
        const { email } = req.query;
        const makePremium = await handlePremium(email);
        console.log("me ejecute",makePremium)
        res.status(201).json("user succesfull Premium/Basic ");
    }
    catch(error){
        console.log(error);
        console.log("______________________");
        console.log("                ERROR: "+error.message);
        res.status(500).json({status:500, message:"There was an error while trying to Change Plan the user."});
    }
});

module.export = router */

router.put("/", async (req, res) => {
    const { email } = req.query;
    try {
        const makePremium = await handlePremium(email);
        console.log("me ejecute", makePremium)
        res.status(201).json("user succesfull Premium/Basic ")
    } catch (error) {
        console.log(error);
        console.log("______________________");
        console.log("                ERROR: " + error.message);
        res.status(500).json({ status: 500, message: "There was an error while trying to Change Plan the user." });
    }
})

module.exports = router