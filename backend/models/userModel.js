const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const validator = require("validator");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

//static signup method creation
userSchema.statics.signup = async function (email, password) {
  //validation    //npm i validator    require

  if (!email || !password) {
    throw Error("Fill All Fields");
  }
  if (!validator.isEmail(email)) {
    throw Error("Not a valid Email");
  }

  const exist = await this.findOne({email});
  if (exist) {
    throw Error("Email already exists!!");
  }

  if (!validator.isStrongPassword(password)) {
    throw Error(
      "Password must contain atleast one Uppercase letter and a special character"
    );
  }

  //npm i bcrypt  require
  const salt = await bcrypt.genSalt(10); //higher value=> higher =>protection=> higher processingtime
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({email, password: hash});

  return user;
};

//static login method
userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error("Fill all the fields");
  }
  const user = await this.findOne({email});
  if (!user) {
    throw Error("Incorrect Email");
  }
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw Error("Incorrect password");
  }
  return user;
};

module.exports = mongoose.model("Users", userSchema);
