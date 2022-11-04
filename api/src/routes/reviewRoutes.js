const {Router} = require ('express')
const routes = Router()
const {getComments, postComments, deletePost} = require('../controllers/Reviews/reviewsController')


routes.get('/', getComments)
routes.post('/', postComments)
routes.delete('/:id', deletePost)

module.exports = routes;