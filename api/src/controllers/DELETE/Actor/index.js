const {Actor} = require('../../../db');

const deleteActor = async (actorId) => {
    const actor = await Actor.findOne({
        where: {
            id: actorId,
        }
    })

    if(!actor || actor.active === false){
        return false;
    } else {
        await actor.update({active: false});
        await actor.save();
        return true;
    }
}

module.exports = {deleteActor}