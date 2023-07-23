const User = require("../models/userModel");

//jwt
const jwt = require("jsonwebtoken");

//token
const createToken = (id) => {
  return jwt.sign({_id: id}, process.env.SECRET, {expiresIn: "3d"});
};

//login
const loginUser = async (req, res) => {
  const {email, password} = req.body;

  try {
    const user = await User.login(email, password);

    const token = createToken(user._id);
    res.status(200).json({email, token});
  } catch (error) {
    res.status(500).json({error: error.message});
  }
};

//signup
const signupUser = async (req, res) => {
  const {email, password} = req.body;
  try {
    const user = await User.signup(email, password);

    const token = createToken(user._id);
    res.status(200).json({email, token});
  } catch (error) {
    res.status(404).json({error: error.message});
  }
};

module.exports = {loginUser, signupUser};
