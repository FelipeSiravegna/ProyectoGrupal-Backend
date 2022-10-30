const  { Router } = require("express");
const {Movie, Genre} = require('../../../db');
const router = Router();
const {validateRating, validateLength, validateReleaseDate} = require('../../../controllers/POST/Movie');

router.post('/', async (req, res) => {
    const {name, description, image, language, releaseDate, length, rating, trailer, popularity, genres} = req.body

    if(!name || !description || !image || !length || !rating || !releaseDate || !genres){
        res.status(404).json({error: "Missing info!"});
    }
    
    try{

        const valLength = validateLength(length);
        const valRating = validateRating(rating);
        const valReleaseDate = validateReleaseDate(releaseDate);

        if(valLength === false){
            res.status(404).json({error: "Length is invalid"})
        } else if( valRating === false){
            res.status(404).json({error: "Rating is invalid"});
        } else if(valReleaseDate === false){
            res.status(404).json({error: "Release date is invalid"});
        } else {
            let newMovie = await Movie.create({
                name: name,
                description: description,
                image: image,
                language: language,
                releaseDate: releaseDate,
                length: length,
                rating: rating,
                trailer: trailer,
                popularity: popularity
            })

            genres.forEach(async (genre) => {
                let genresMovie = await Genre.findOne({where: {name: genre}});
                await newMovie.addGenre(genresMovie);
            })

            res.status(200).send("Movie created successfully");
        }
    } catch(error){
        console.log(error.message);
    }
});

module.exports = router;
