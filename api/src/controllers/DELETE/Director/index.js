const {Director} = require('../../../db');

const deleteDirector = async (directorId) => {
    const director = await Director.findOne({
        where: {
            id: directorId,
        }
    })

    if(!director || director.active === false){
        return false;
    } else {
        await director.update({active: false});
        await director.save();
        return true;
    }
}

module.exports = {deleteDirector}