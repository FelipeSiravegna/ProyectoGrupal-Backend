const { Router } = require("express");
const router = Router();
const { createList } = require("../../../controllers/POST/list");

router.post("/list/:userId", async(req, res)=>{
    try{
        const { userId } = req.params;
        const { name, description } = req.body;
        console.log("uId:"+userId, "name: "+name, "des: "+description);
        const newList = await createList(name, description, userId);
        res.status(newList.status).json(newList);
    }catch(error){
        console.log(error)
        console.log("_____________________________");
        console.log(error.message);
        res.status(500).json({status:500, message:"There was a problem"});
    }
});

module.exports = router;
