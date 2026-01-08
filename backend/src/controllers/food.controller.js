const foodModel = require("../models/food.model");
const likeModel = require("../models/likes.model");
const saveModel = require("../models/save.model");
const storageService = require("../service/stroage.service");
const { v4: uuid } = require("uuid");

const createFood = async (req, res) => {
  try {
    let { name, description } = req.body;
    const fileUploadResult = await storageService.uploadFile(
      req.file.buffer,
      uuid()
    );
    let foodItem = await foodModel.create({
      video: fileUploadResult.url,
      name,
      description,
      foodPartner: req.foodPartner._id,
    });
    return res
      .status(201)
      .json({ message: "Food created successfully", food: foodItem });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error uploading file", error: error.message });
  }
};

const getFoodItems = async (req, res) => {
  try {
    let foodItems = await foodModel.find();
    return res.status(200).json({
      message: "Food items fetched successfully",
      foodItems: foodItems,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error fetching food items", error: error.message });
  }
};


const likeFood = async (req, res) => {
  const { foodId } = req.body;
  const user = req.user;

  const isAlreadyExists = await likeModel.findOne({
    user: user._id,
    food: foodId,
  });
  if (isAlreadyExists) {
    await likeModel.deleteOne({
      user: user._id,
      food: foodId,
    });

    await foodModel.findByIdAndUpdate(foodId, {
      $inc: { likeCount: -1 },
    });

    return res.status(200).json({
      message: "Food Unliked Successfully",
    });
  }

  const like = await likeModel.create({
    user: user._id,
    food: foodId,
  });

  await foodModel.findByIdAndUpdate(foodId, {
    $inc: { likeCount: 1 },
  });

  return res.status(200).json({
    message: "Food liked Successfully",
    like,
  });
};

const saveFood = async (req, res) => {
  const { foodId } = req.body;
  const user = req.user;

  const isAlreadyExists = await saveModel.findOne({
    user: user._id,
    food: foodId
  });

  if (isAlreadyExists) {
    await saveModel.deleteOne({
      user: user._id,
      food: foodId,
    });

    await saveModel.findByIdAndUpdate(foodId, {
      $inc: { savesCount: -1 },
    });

    return res.status(200).json({
      message: "Food Unsave Successfully",
    });
  }

  const save = saveModel.create({
    user: user._id,
    food: foodId,
  })

  await saveModel.findByIdAndUpdate(foodId, {
    $inc: { savesCount: 1 },
  });

  return res.status(200).json({
    message: "Food save Successfully",
    save
  });
};

async function getSaveFood(req, res) {
  const user = req.user;

  const savedFoods = await saveModel
    .find({ user: user._id })
    .populate('food');

  if (!savedFoods || savedFoods.length === 0) {
    return res.status(404).json({
      message: "No saved foods found"
    });
  }

  res.status(200).json({
    message: "Saved foods retrieved successfully",
    savedFoods
  });
}

module.exports = { createFood, getFoodItems, likeFood, saveFood, getSaveFood };
