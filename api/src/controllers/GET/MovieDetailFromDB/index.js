const { Movie } = require('../../../db');
const { getCredits } = require('../Credits');

const getMovieFromDB = async (movieId) => {

  const movie = await Movie.findOne({
    where: { id: movieId }
  });

  if (!movie) {
    return undefined;
  } else {

    const fullCast = await getCredits(movie.name, movie.description);
    const genres = await movie.getGenres();

    const genresInfo = genres.map((g) => {
      const newGenre = {
        id: g.id,
        name: g.name
      }
      return newGenre;
    })

    const movieDetails = {
      id: movie.id,
      name: movie.name,
      description: movie.description,
      image: movie.image,
      language: movie.language,
      releaseDate: movie.releaseDate,
      length: movie.length,
      rating: movie.rating,
      trailer: movie.trailer,
      popularity: movie.popularity,
      genres: genresInfo,
      fullCast: fullCast,
      saves: movie.saves,
    };

    return movieDetails;
  }
};

module.exports = { getMovieFromDB };