const express = require('express');
const  connectDB = require('./configs/database.js');
const User = require('./models/user.js');
const app = express()
  
connectDB()
.then(()=> {
    console.log('mongoDB conncted succesfully')
    app.listen(3001 , ()=>{
        console.log('Server is running on port 3001');
    })
})
.catch(err => console.log(err));

app.use(express.json())
app.post('/signup' , async(req , res)=>{
    try{
         const newUser  = new User(req.body)
         await newUser.save()
          res.status(201).send({message : "Signup Successfully" , data : newUser})
    }catch(err){
        console.log(err)
        res.status(400).send({message : err.message})
    }

})

app.get('/user' , async(req, res)=>{
    try{
      const {id} = req.body
      const user = await User.findById({_id : id})
      if(!user){
        res.status(404).send("user not found")
      } else{
        res.send(user)
      }
    }catch(err){
        res.status(400).send("something went wrong")
    }
})

app.get('/feed' , async(req, res)=>{
    try{
        const feed = await User.find()
        res.status(200).send(feed)
    }catch(err){
        res.status(400).send({message : err.message})
    }
})

app.delete('/user' , async(req,res)=>{
    try{
      const {id} = req.body
      const userDelete = await User.findByIdAndDelete(id)
      if(!userDelete){
        res.status(401).send("something went wrong")
      }else{
        res.send("user deleted")
      }
    }catch(err){
        res.send(err.message)
    }
})




