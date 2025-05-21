const express = require('express');
const isUserAthenticated = require('../middlewares/userAuth');
const validateEditProfileData = require('../utils/validatioin');
const profileRouter = express.Router()

profileRouter.get("/profile/view", isUserAthenticated , async (req, res) => {
  try{
    const user = req.user;
    res.status(200).send(user);
  }catch(err){
    res.status(500).send({message : err.message})
  }
});

profileRouter.patch("/profile/edit", isUserAthenticated , async(req, res)=>{
    try{
      if(!validateEditProfileData(req)){
       throw new Error("Invalid Edit request");
      };
      const loggedinUser = req.user
      Object.keys(req.body).forEach((key)=> loggedinUser[key] = req.body[key])

      await loggedinUser.save()
      res.json({
        message : `${loggedinUser?.firstName}'s profile is updated succesfully`,
        data : loggedinUser
      })
    }catch(err){
      res.status(500).send({message : err.message})
    }

})


module.exports = profileRouter