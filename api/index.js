const server = require('./src/app');
const { conn, User, Genre, Movies, Actor, Director } = require('./src/db');
const {API_KEY} = process.env;
const axios = require('axios');
const movieList = require('./MOVIES.json');

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

    Director.findOrCreate({
      where: {
        name: movie.fullCast.director.name
      }
    })

    movie.fullCast.cast.forEach((act) => {
      Actor.findOrCreate({
        where: {
          name: act.name
        }
      })
    })
  })
}

const setRelation = () =>{
  movieList.forEach(async(movie)=>{
    const count = await Genre.findAndCountAll()
    const relevant = await Genre.findAll({where:{id:movie.genres}})
    const DB_Movie = await Movies.findOne({where:{name:movie.name}})
    if (DB_Movie){
      const relation = await DB_Movie.setGenres(relevant)
    }
  })
}

const findOrCreateUser = async () => {
  User.findOrCreate({
    where: {username:"Usuario1", email:"example@example.com", password:"passWord$2"}
  })
}
// Syncing all the models at once.
conn.sync({ force: true }).then(() => {
  server.listen(3001, async () => {
    checkGenresInDB();
    findOrCreateUser();
    findOrCreateMovies();
    setRelation();
    console.log('%s listening at 3001'); // eslint-disable-line no-console
  });
});