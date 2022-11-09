const server = require('./src/app');
const { conn, User, Genre, Movie, Actor, Director } = require('./src/db');
const { API_KEY } = process.env;
const axios = require('axios');
const movieList = require('./MOVIES.json');

const checkGenresInDB = async () => {
  const genresAPI = await axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`)

  genresAPI.data.genres.forEach((genre) => {
    Genre.findOrCreate({
      where: { id: genre.id, name: genre.name }
    })
  })
}

const findOrCreateMovies = async () => {
  let newDirector = null;
  for (let i = 0; i < movieList.length; i++) {
    let newMovie = await Movie.findOrCreate({
      where: {
        name: movieList[i].name,
        description: movieList[i].description,
        releaseDate: movieList[i].releaseDate,
        image: movieList[i].image,
        length: movieList[i].length,
        language: movieList[i].language,
        rating: movieList[i].rating,
        trailer: movieList[i].trailer,
        popularity: movieList[i].popularity,
        saves: movieList[i].saves
      }
    })

    //RELACION MOVIE - DIRECTOR
    newDirector = await Director.findOrCreate({
      where: {
        name: movieList[i].fullCast.director.name
      }
    })

    await newDirector[0].addMovie(newMovie[0]);

    //RELACION ACTOR - MOVIE
    for (let j = 0; j < movieList[i].fullCast.cast.length; j++) {
      let actorData = movieList[i].fullCast.cast[j]
      const newActor = await Actor.findOrCreate({
        where: {
          name: actorData.name
        }
      })

      await newActor[0].addMovie(newMovie[0]);
    }

    //RELACION MOVIE - GENRE
    const genres = await Genre.findAll({ where: { id: movieList[i].genres } });
    for (let i = 0; i < genres.length; i++) {
      await genres[i].addMovie(newMovie[0]);
    }
  }
}

const findOrCreateUser = async () => {
  User.findOrCreate({
    where: { username: "Usuario1", email: "test_user_51507072@testuser.com", password: "passWord$2" }
  })
}

// Syncing all the models at once.
conn.sync({ force: false }).then(() => {
  server.listen(3001, async () => {
    console.log("Levantando servidor...");
    await checkGenresInDB();
    await findOrCreateUser();
    await findOrCreateMovies();
    console.log('%s listening at 3001'); // eslint-disable-line no-console
  });
});