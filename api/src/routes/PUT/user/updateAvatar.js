const  { Router } = require("express");
const router = Router();
const {User} = require('../../../db');
const {multerUploader} = require('../../../config/multer');
const {getUserByPk} = require('../../../controllers/GET/users');
const {cloudUploader} = require('../../../config/cloudinary');

router.put('/:id', multerUploader, async (req, res) => {
    const {id} = req.params;

    try{
        const user = await getUserByPk(id);
        const imageData = await cloudUploader.upload(req.file.path, {folder: "TheCornerMovies"});

        user.update({
            image: imageData.secure_url
        })

        user.save();
        res.status(200).json({message: "OK!", imageURL: imageData.secure_url});
    } catch(error){
        console.log(error);
        res.status(400).json({error: "Fail!"})
    }
})

module.exports = router;
