const express = require("express");
const connectDB = require("./configs/database.js");
const app = express();
const cookieParser = require("cookie-parser");
const authRouter = require('./routes/auth.js');
const profileRouter = require('./routes/profile.js');
const requestRouter = require('./routes/request.js')

app.use(express.json());
app.use(cookieParser());
app.use('/' , authRouter);
app.use('/' , profileRouter);
app.use('/' , requestRouter);

connectDB()
  .then(() => {
    console.log("mongoDB conncted succesfully");
    app.listen(3001, () => {
      console.log("Server is running on port 3001");
    });
  })
  .catch((err) => console.log(err));








