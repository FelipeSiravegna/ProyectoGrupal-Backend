const { Router } = require("express");
const router = Router();
const { getBannedUsers } = require("../../../controllers/GET/users");

router.get("/banned",async (req,res)=>{
    try{
        const bannedUsers = await getBannedUsers();
        if(!bannedUsers){
            res.status(404).json({status:404, message:"There was a problem to get the banned users"});
            return;
        }
        else if (!bannedUsers.length){
            res.status(200).json({status:200, message:"There aren't banned users"});
            return;
        }
        res.status(200).json(bannedUsers);
    }
    catch(error){
        console.log(error);
        console.log("___________________________________");
        console.log("ERROR: "+error.message);
    }
});

