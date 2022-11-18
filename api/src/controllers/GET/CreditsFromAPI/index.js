const { API_KEY } = process.env;
const axios = require('axios');

const getCreditsFromAPI = async (movieId) => {
    const credits = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${API_KEY}`)

    const director = credits.data.crew.find(
        person => person.job === "Director"
    )

    const directorInfo = {
        id: director.id,
        name: director.name,
    }

    const cast = credits.data.cast.filter(
        person => person.known_for_department === "Acting" && person.order < 20
    )

    const castInfo = cast.map(actor => {
        let actorInfo = {
            id: actor.id,
            name: actor.name,
            characterName: actor.character
        };

        return actorInfo;
    })

    const producers = credits.data.crew.filter(
        person => person.department === "Production"
    )

    const producersInfo = producers.map(producer => {
        let producerInfo = {
            id: producer.id,
            name: producer.name,
            job: producer.job
        }

        return producerInfo;
    })

    return {
        director: directorInfo,
        cast: castInfo,
        producers: producersInfo
    }
}

module.exports = { getCreditsFromAPI };