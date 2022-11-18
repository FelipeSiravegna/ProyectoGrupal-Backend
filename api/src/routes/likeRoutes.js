const { Router } = require('express')
const routes = Router()
const { getLikes, postLikes } = require('../controllers/Likes/likesController')

routes.get('/', getLikes)
routes.post('/', postLikes)

module.exports = routes;