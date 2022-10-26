// Importar todos los routers
const { Router } = require("express");
const router = Router();
// const userRoute = require('./POST/user');
const usersRoute = require("./GET/users");


// Configurar los routers
// router.use('/user', userRoute);
router.use('/userr', usersRoute);


module.exports = router;
