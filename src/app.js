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
app.get('/' ,(req , res)=>{
    res.send('hello')
})
app.post('/signup' , async(req , res)=>{
    try{
        const userObj = {
            firstName : "Ritik",
            lastName : "Solanki",
            email : "ritik@gmail.com",
            password : "Ritik@123",
            age : 24,
            gender  : "Male"
          }
         const newUser  = new User(userObj)
         await newUser.save()
          res.status(201).send({message : "Signup Successfully" , data : newUser})
    }catch(err){
        console.log(err)
        res.status(400).send({message : "error while signup"})
    }

})




