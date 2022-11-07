const {Director} = require('../../../db');

const banDirector = async (directorId) => {
    const director = await Director.findByPk(directorId);

    if(!director || director.banned === true){
        return false;
    } else {
        await director.update({banned: true});
        await director.save();
        return true;
    }
}

module.exports = {banDirector}