import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import cors from 'cors';
import connectDB from './config/connectdb.js'
import userRoutes from './routes/userRoutes.js'
import checkUserAuth from './middlewares/auth-middleware.js'

const app =express()
const port = process.env.PORT
const DATABASE_URL = process.env.DATABASE_URL

app.use(cors())

// DB connection
connectDB(DATABASE_URL)

// JSON
app.use(express.json())

app.get("/", (req, res) => {
  res.send("This is home page");
});

// GET API
app.get("/get", (req, res) => {
    res.json({message: "This is your get API"});
  });

// Logout
app.get("/logout",checkUserAuth, async(req, res)=>{
  try {
    res.clearCookie("jwt");
    console.log("Logout Successfully")
    await req.user.save();
    res.render("login")
  } catch (error) {
    res.status(500).send(error);
  }
}) 

// load routes
app.use("/api/user", userRoutes)

app.listen(port,()=>{
    console.log(`Server listening at http://localhost:${port}`)
})