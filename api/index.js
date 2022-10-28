const server = require('./src/app');
const { conn, User, Genre } = require('./src/db');
const {API_KEY} = process.env;
const axios = require('axios');

const checkGenresInDB = async () => {
  const genresAPI = await axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`)

  genresAPI.data.genres.forEach((genre) => {
    Genre.findOrCreate({
      where: {id: genre.id, name: genre.name}
    })
  })
}

// Syncing all the models at once.
conn.sync({ force: true }).then(() => {
  server.listen(3001, async () => {
    await User.create({username:"Usuario1", email:"example@example.com", password:"passWord$2"});
    await User.create({username:"Usuario2", email:"example2@example.com", password:"passWord$2"});
    await User.create({username:"Usuario3", email:"example@example3.com", password:"passWord$2"});
    checkGenresInDB();
    console.log('%s listening at 3001'); // eslint-disable-line no-console
  });
});