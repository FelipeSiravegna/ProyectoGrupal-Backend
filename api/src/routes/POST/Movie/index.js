const  { Router } = require("express");
const {Movie, Genre, Actor, Director} = require('../../../db');
const router = Router();
const {validateRating, validateLength, validateReleaseDate} = require('../../../controllers/POST/Movie');

router.post('/', async (req, res) => {
    const {name, description, image, language, releaseDate, length, rating, trailer, popularity, genres, director, actors} = req.body

    if(!name || !description || !image || !length || !rating || !releaseDate || !genres || !director || !popularity){
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
            let newMovie = await Movie.findOrCreate({
                where: {
                    name: name,
                    description: description,
                    image: image,
                    language: language,
                    releaseDate: releaseDate,
                    length: length,
                    rating: rating,
                    trailer: trailer,
                    popularity: popularity,
                    saves: 0
                }
            })

            if(newMovie[1] === true){
                const newDirector = await Director.findOrCreate({
                    where: {
                        name: director
                    }
                })
                console.log("newDirector")
                await newDirector[0].addMovie(newMovie[0]);
    
                if(actors.length){
                    for(let i=0; i<actors.length; i++){
                        let actor = actors[i];
                        const newActor = await Actor.findOrCreate({
                            where: {
                                name: actors[i]
                            }
                        })
                        console.log("NewActor")
                        await newActor[0].addMovie(newMovie[0]);
                    }
                }

                genres.forEach(async (genre) => {
                    let genresMovie = await Genre.findOne({where: {name: genre}});
                    await newMovie[0].addGenre(genresMovie);
                })
            }else {
                res.status(404).json({error: "That movie already exists"})
            }

            res.status(200).send("Movie created successfully");
        }
    } catch(error){
        console.log(error.message);
    }
});

module.exports = router;
