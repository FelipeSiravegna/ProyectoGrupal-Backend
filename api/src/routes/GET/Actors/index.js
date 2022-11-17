const {getAllActors} =require('../../../controllers/GET/Actors/index')
const {Router} = require ('express')
const routes = Router()


routes.get('/', getAllActors)

module.exports = routes;