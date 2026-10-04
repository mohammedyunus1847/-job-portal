require("dotenv").config();

const express= require('express');
const cors = require ('cors');
const connectDb = require("./config/db");
const authRoutes= require("./routes/authroutes");
const jobROutes = require("./routes/jobroutes")

const app = express();

connectDb();

app.use(cors());

app.use(express.json())

app.use("/api/auth",authRoutes)
app.use("/api/job",jobROutes)

const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log(`Server is Running On http://localhost:${PORT}`)
})