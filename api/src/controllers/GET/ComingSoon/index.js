const axios = require('axios');
const { API_KEY } = process.env;

const getComingSoonMovies = async () => {
    const movies = await axios.get(`https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}`);

    const allMovies = movies.data.results.map((movie) => {
        const newMovie = {
            name: movie.title,
            image: `https://image.tmdb.org/t/p/original${movie.poster_path}`,
            releaseDate: movie.release_date
        }

        return newMovie;
    })

    return allMovies;
}

module.exports = { getComingSoonMovies }