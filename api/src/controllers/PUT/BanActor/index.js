const { Actor } = require('../../../db');

const banActor = async (actorId) => {
    const actor = await Actor.findByPk(actorId);

    if (!actor || actor.banned === true) {
        return false;
    } else {
        await actor.update({ banned: true });
        await actor.save();
        return true;
    }
}

module.exports = { banActor }