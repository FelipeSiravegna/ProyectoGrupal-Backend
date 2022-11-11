const multer = require('multer');
const path = require('path');

const multerUploader = multer({
    //diskStorage vacio usa el tmp del so
    storage: multer.diskStorage({}),
    limits: {
        fileSize: 3000000 /* 3MB */
    },
    fileFilter: (req, file, callback) => {
        let extension = path.extname(file.originalname);
        const validExtensions = [".jpg", ".jpeg", ".png"];
        if (!validExtensions.includes(extension)) {
            callback(
                new Error("Invalid extension, we only support: .jpeg, .jpg and .png"),
                false
            );
            return;
        }
        //valid extension
        callback(null, true);
    }
});

module.exports = { multerUploader: multerUploader.single('image') }