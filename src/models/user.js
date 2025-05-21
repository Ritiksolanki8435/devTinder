const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 20,
      trim: true,
    },
    lastName: {
      type: String,
      minLength: 3,
      maxLength: 20,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    age: {
      type: Number,
      min: 18,
      required: true,
    },
    gender: {
      type: String,
    },
    about: {
      type: String,
      trim: true,
    },
    skills: {
      type: [String],
    },
    profilePic: {
      type: String,
      default:
        "https://res.cloudinary.com/dqj8v0x4g/image/upload/v1698230981/DefaultProfilePic.png",
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.getJWT =  function(){
  const token =  jwt.sign({id : this._id} , "Ritik@123$dz")
  return token
}

const User = mongoose.model("User", userSchema);

module.exports = User;
