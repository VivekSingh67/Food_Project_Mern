const express = require('express')
const routes = express.Router()
const authMiddleware = require("../middlewares/auth.middleware");
const foodPartnerController = require('../controllers/food-partner.controller')

routes.get('/food-partner/:id', authMiddleware.authUserMiddleware, foodPartnerController.foodPartnerById)


module.exports = routes