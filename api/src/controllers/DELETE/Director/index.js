const { Director } = require('../../../db');

const deleteDirector = async (directorId) => {
    const director = await Director.findByPk(directorId);

    if (!director || director.active === false) {
        return false;
    } else {
        await director.update({ active: false });
        await director.save();
        return true;
    }
}

module.exports = { deleteDirector }