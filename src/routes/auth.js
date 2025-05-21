const express =  require('express');
const isUSerValidated = require('../middlewares/validator');
const User = require('../models/user');
const authRouter = express.Router();
const bcrypt = require('bcrypt');

authRouter.post("/signup",  isUSerValidated, async (req, res) => {
  try {
    const { email, password, gender, age, firstName, lastName, about, skills, profilePic } = req.newUser;
    const hashedPassword = await bcrypt.hash(password, 10);
    if (!hashedPassword) {
      return res.status(500).send({ message: "Error hashing password" });
    }

    const isUserAlreadyExist = await User.findOne({email:email})
    if(isUserAlreadyExist){
      return res.status(400).send({message : 'user with this email is already exist'})
        
    }
    const newUser = new User({
      email,
      password: hashedPassword,
      gender: gender,
      age: age,
      firstName: firstName,
      lastName: lastName,
      about: about,
      skills: skills,
      profilePic: profilePic
    });
    await newUser.save();
    res.status(201).send({ message: "Signup successful" });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Internal server error" });
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .send({ message: "please provide email and password" });
    }
    const isUserExist = await User.findOne({ email: email });
    const isPasswordValid = await bcrypt.compare(
      password,
      isUserExist.password
    );
    if (!isUserExist || !isPasswordValid) {
      return res.status(400).send({ message: "invalid credentials" });
    }
    const token = isUserExist.getJWT()
    if (!token) {
      return res.status(500).send({ message: "something went wrong" });
    }
    res.cookie("token", token);
    res.send({ message: "login successful" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

authRouter.post("/logout" , async(req,res)=>{
    res.cookie('token' , null , {
        expires : new Date(Date.now())
    })
})


module.exports = authRouter