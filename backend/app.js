const express=require('express');
const app=express();
const usersRouter=require("./routes/usersRouter");
const postsRouter=require("./routes/postsRouter");
const mongoose=require('mongoose');
const cors=require('cors');
const cookieParser=require('cookie-parser');
const { getUserDetails } = require('./controllers/authController');
const { verifyToken } = require('./middlewares/authMiddleware');
require('dotenv').config();
mongoose.connect(process.env.MONGODB_URI);
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());




// Enable CORS for all routes
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
  }));
  

app.get('/',function(req,res){
    res.send('hey');
    app.use("/");
})

app.use("/users", usersRouter);
app.use("/posts", postsRouter);
app.use("/user",verifyToken,getUserDetails); // this route is to get user role 



const PORT=process.env.PORT;
app.listen(PORT,()=>{
    console.log(`Server running at port ${PORT}`);
});