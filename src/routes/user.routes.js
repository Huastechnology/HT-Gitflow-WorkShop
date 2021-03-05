/**
 * @todo
 * write your user routes here
 */
const { Router } = require('express')
const api = Router()
const userController = require('../controllers/user.controller')

api.post('/user', userController.saveUser)

module.exports = api