// Importar todos los routers
const { Router } = require("express");
const router = Router();
const postUserRoute = require('./POST/user');
const putUserRoute = require("./PUT/user");
const getUsersRoute = require("./GET/users");


// Configurar los routers
router.use('/user', postUserRoute, putUserRoute, async()=>console.log(putUserRoute));
router.use('/getusers', getUsersRoute);


module.exports = router;