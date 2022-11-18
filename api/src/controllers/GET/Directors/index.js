const { Director } = require('../../../db');

const getAvailableDirectors = async () => {
    const directors = await Director.findAll({
        where: {
            banned: false,
            active: true
        }
    })

    return directors;
}

const getActiveDirectors = async () => {
    const directors = await Director.findAll({
        where: { active: true }
    })
    return directors
}

const getBannedDirectors = async () => {
    const directors = await Director.findAll({
        where: { banned: true }
    });
    return directors;
}

const getInactiveDirectors = async () => {
    const directors = await Director.findAll({
        where: { active: false }
    });
    return directors;
}

module.exports = {
    getActiveDirectors,
    getAvailableDirectors,
    getBannedDirectors,
    getInactiveDirectors
}