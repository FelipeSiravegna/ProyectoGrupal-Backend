const { Movie } = require('../../../db');
const {getCredits} = require('../Credits');
const {getGenres} = require('../Genres');

const getMovieFromDB = async (movieId) => {
  
  const movie = await Movie.findOne({
    where: {id: movieId}
  });
    
  if(!movie){
    return undefined;
  } else {

    const fullCast = await getCredits(movie.name, movie.description);
    const genres = await getGenres(movie.name, movie.description);

    const movieDetails = {
      id: movie.id,
      name: movie.name,
      description: movie.description,
      image: movie.image,
      popularity: movie.popularity,
      language: movie.original_language,
      releaseDate: movie.releaseDate,
      length: movie.length,
      rating: movie.rating,
      trailer: movie.trailer,
      fullCast: fullCast,
      genres: genres,
      saves: movie.saves,
    };

    return movieDetails;
  }
};

module.exports = { getMovieFromDB };