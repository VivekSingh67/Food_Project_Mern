const express = require('express');
const routes = express.Router()
const authController = require('../controllers/auth.controller')

routes.post('/user/register', authController.registerUser)
routes.post('/user/login', authController.loginUser)
routes.get('/user/logout', authController.logout)


routes.post('/foodPartner/register', authController.registerFoodPartner)
routes.post('/foodPartner/login', authController.loginFoodPartner)
routes.get('/foodPartner/logout', authController.logoutFoofPartner)

module.exports = routes