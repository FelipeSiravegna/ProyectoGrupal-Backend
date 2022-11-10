const {Director} = require('../../../db');

const getActiveDirectors = async () => {
    const directors = await Director.findAll({
        where: {
            banned: false,
            active: true
        }
    })

    return directors;
}

module.exports = {getActiveDirectors}