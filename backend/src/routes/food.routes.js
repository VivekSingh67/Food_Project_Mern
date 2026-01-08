const express = require("express");
const routes = express.Router();
const authMiddleware = require("../middlewares/auth.middleware");
const foodController = require('../controllers/food.controller')
const multer = require('multer')
const upload = multer({ storage: multer.memoryStorage() })

routes.post("/", authMiddleware.authFoodPartnerMiddleware, upload.single("video"), foodController.createFood);
routes.get("/", authMiddleware.authUserMiddleware, foodController.getFoodItems);
routes.post("/like", authMiddleware.authUserMiddleware, foodController.likeFood);
routes.post("/save", authMiddleware.authUserMiddleware, foodController.saveFood);
routes.get("/save", authMiddleware.authUserMiddleware, foodController.getSaveFood);



module.exports = routes;
