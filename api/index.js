const server = require('./src/app');
const { conn, User, List, Genre, Movie, Actor, Director } = require('./src/db');
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
  let newDirector;
  for(let i = 0; i < movieList.length; i++){
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

    newDirector = await Director.findOrCreate({
      where: {
        name: movieList[i].fullCast.director.name
      }
    })
    
    await newDirector[0].addMovie(newMovie[0]);

    for(let j = 0; j < movieList[i].fullCast.cast.length; j++){
      let actorData = movieList[i].fullCast.cast[j]
      const newActor = await Actor.findOrCreate({
        where:{
          name: actorData.name 
        }
      })

      await newActor[0].addMovie(newMovie[0]);
    }
  }
}

const setRelation = () =>{
  movieList.forEach(async(movie)=>{
    const count = await Genre.findAndCountAll()
    const relevant = await Genre.findAll({where:{id:movie.genres}})
    const DB_Movie = await Movie.findOne({where:{name:movie.name}})
    if (DB_Movie){
      const relation = await DB_Movie.setGenres(relevant)
    }
  })
}

const findOrCreateUser = async () => {
  const userExample = await User.findOrCreate({
    where: {username:"Usuario1", email:"example@example.com", password:"passWord$2"}
  });
  const movies = await Movie.findAll();
  console.log(movies);
  const listExample = await List.findOrCreate({
    where:{
      name:"A marvellous list",
    },
    defaults:{
      name:"A marvellous list",
      description:"A descriptively descriptive description",
      userId:userExample[0].id
    }
  });
  console.log(insertMovie1)
  await listExample[0].addMovie(movies[0]);
  await listExample[0].addMovie(movies[1]);
  await listExample[0].addMovie(movies[2]);
}

// Syncing all the models at once.
conn.sync({ force: true }).then(() => {
  server.listen(3001, async () => {
    console.log("Levantando servidor...");
    await checkGenresInDB();
    await findOrCreateMovies();
    setRelation();
    await findOrCreateUser();
    console.log('%s listening at 3001'); // eslint-disable-line no-console
  });
});


