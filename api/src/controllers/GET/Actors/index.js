const {Actor} = require('../../../db');

const getAllActors = async (req, res)=>{
   try {
       let actor = await Actor.findAll({
        where:{
            banned: false,
            active: true
        }
       });
       console.log(actor)
     
       res.json(actor)
   } catch (error) {
        res.status(404).json({error})
   }
}

module.exports={getAllActors}