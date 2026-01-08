const userModel = require("../models/user.model");
const foodPartnerModel = require("../models/foodPartner.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const registerUser = async (req, res) => {
  try {
    const { fullname, email, password } = req.body;
    const isUserAlreadyExists = await userModel.findOne({
      email: email,
    });
    if (isUserAlreadyExists) {
      return res.status(400).json({
        message: "user already exists",
      });
    }
    let hashPassword = await bcrypt.hash(password, 10);
    let user = await userModel.create({
      fullname,
      email,
      password: hashPassword,
    });

    let token = jwt.sign(
      { email: user.email, id: user._id },
      process.env.JWT_SECRET
    );
    res.cookie("token", token);
    res.status(201).json({
      message: "User Successfully Created",
      user: {
        id: user._id,
        fullname: user.fullname,
        email: user.email,
      },
    });
  } catch (error) {
    console.log(error.message);
  }
};

const loginUser = async (req, res) => {
  try {
    let { email, password } = req.body;
    let user = await userModel.findOne({ email: email });
    if (!user) {
      return res.status(400).json({
        message: "email or password invalid",
      });
    }

    let isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({
        message: "email or password invalid",
      });
    }

    let token = jwt.sign(
      {
        email: user.email,
        id: user._id,
      },
      process.env.JWT_SECRET
    );
    res.cookie("token", token);
    res.status(200).json({
      message: "Successfully Login",
      user: {
        id: user._id,
        fullname: user.fullname,
        email: user.email,
      },
    });
  } catch (error) {
    console.log(error.message);
  }
};
const logout = (req, res) => {
  res.clearCookie("token");
  res.status(200).json({
    message: "User logged out successfully",
  });
};

const registerFoodPartner = async (req, res) => {
  try {
    let { name, contactName, phone, address, email, password } = req.body;
    let isAlreadyExists = await foodPartnerModel.findOne({ email: email });
    if (isAlreadyExists) {
      return res.status(400).json({
        message: "food partner already exists",
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);
    let foodPartner = await foodPartnerModel.create({
      name,
      contactName,
      phone,
      address,
      email,
      password: hashPassword,
    });
    let token = jwt.sign(
      { email: foodPartner.email, id: foodPartner._id },
      process.env.JWT_SECRET
    );
    res.cookie("token", token);
    res.status(200).json({
      message: "Food Partner Successfully Create",
      foodPartner: {
        id: foodPartner._id,
        name: foodPartner.name,
        contactName: foodPartner.contactName,
        phone: foodPartner.phone,
        address: foodPartner.address,
        email: foodPartner.email,
      },
    });
  } catch (error) {
    console.log(error.message);
  }
};

const loginFoodPartner = async (req, res) => {
  try {
    let { email, password } = req.body;
    let foodPartner = await foodPartnerModel.findOne({ email: email });
    if (!foodPartner) {
      return res.status(400).json({
        message: "Invalid email or passowrd",
      });
    }
    let isValidPassword = await bcrypt.compare(password, foodPartner.password);
    if (!isValidPassword) {
      return res.status(400).json({
        message: "Invalid email or passowrd",
      });
    }

    let token = jwt.sign(
      { email: foodPartner.email, id: foodPartner._id },
      process.env.JWT_SECRET
    );
    res.cookie("token", token)
    res.status(200).json({
        message:"Food Partner Login Successfully",
        foodPartner: {
            id: foodPartner._id,
            name: foodPartner.name,
            email: foodPartner.email
        }
    })
  } catch (error) {
    console.log(error.message);
  }
};

const logoutFoofPartner = (req, res) => {
    res.clearCookie("token")
    res.status(200).json({
         message: "Successfully Logout"
    })
}

module.exports = { registerUser, loginUser, logout, registerFoodPartner, loginFoodPartner, logoutFoofPartner };
