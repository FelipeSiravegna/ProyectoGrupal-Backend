const server = require('./src/app');
const { conn, User, Genre, Movies } = require('./src/db');
const {API_KEY} = process.env;
const axios = require('axios');
const movieList = require('../MOVIES.json');

const checkGenresInDB = async () => {
  const genresAPI = await axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`)

  genresAPI.data.genres.forEach((genre) => {
    Genre.findOrCreate({
      where: {id: genre.id, name: genre.name}
    })
  })
}

const findOrCreateMovies = async () => {
  movieList.forEach((movie) => {
    Movies.findOrCreate({
      where: {
        name: movie.name, 
        description: movie.description,
        releaseDate: movie.releaseDate,
        image: movie.image,
        length: movie.length,
        language: movie.language,
        rating: movie.rating,
        trailer: movie.trailer,
        popularity: movie.popularity,
        saves: movie.saves
      }
    })
  })
}

const findOrCreateUser = async () => {
  User.findOrCreate({
    where: {username:"Usuario1", email:"example@example.com", password:"passWord$2"}
  })
}
// Syncing all the models at once.
conn.sync({ force: false }).then(() => {
  server.listen(3001, async () => {
    findOrCreateUser();
    findOrCreateMovies();
    checkGenresInDB();
    console.log(movieList.length);
    console.log('%s listening at 3001'); // eslint-disable-line no-console
  });
});