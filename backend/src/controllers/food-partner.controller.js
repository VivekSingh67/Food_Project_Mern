const foodPartnerModel = require("../models/foodPartner.model");
const foodModel = require('../models/food.model')


const foodPartnerById = async (req, res) => {
  const foodPartnerId = req.params.id;
  const foodPartner = await foodPartnerModel.findById(foodPartnerId);
  const foodItemByFoodPartner =  await foodModel.find({foodPartner: foodPartnerId})
   if(!foodPartner) {
    return res.status(404).json({
        message: "food partner not found"
    })
  }
res.status(200).json({
    message: "Food Partner retrived Successfully",
    foodPartner: {
        ...foodPartner.toObject(),
        foodItem: foodItemByFoodPartner
    }
})
};

module.exports = { foodPartnerById };
