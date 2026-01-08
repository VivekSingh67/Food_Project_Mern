const foodPartnerModel = require("../models/foodPartner.model");
const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");

const authFoodPartnerMiddleware = async (req, res, next) => {
  let token = req.cookies.token;
  if (!token) {
    return res.status(401).json({
      message: "Please login First",
    });
  }

  try {
    let decoded = jwt.verify(token, process.env.JWT_SECRET);
    let foodPartner = await foodPartnerModel.findById(decoded.id);
    req.foodPartner = foodPartner;
    console.log(foodPartner)
    next()
  } catch (error) {
    return res.status(401).json({
      message: "Invalid Token",
    });
  }
};


const authUserMiddleware = async (req, res, next) => {
  let token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      message: "Please login first"
    })
  }

  try {
    let decoded = jwt.verify(token, process.env.JWT_SECRET)
    let user = await userModel.findById(decoded.id)
    req.user = user
    next()
  } catch (error) {
    return res.status(401).json({
      message: "Invalid Token"
    })
  }
}

module.exports = { authFoodPartnerMiddleware, authUserMiddleware }