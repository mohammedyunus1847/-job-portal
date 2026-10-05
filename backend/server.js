require("dotenv").config();

const express= require('express');
const cors = require ('cors');
const connectDb = require("./config/db");
const authRoutes= require("./routes/authroutes");
const jobROutes = require("./routes/jobroutes")
const applicationRoutes = require("./routes/applicationRoutes")

const app = express();

connectDb();

app.use(cors());

app.use(express.json())

app.use("/api/auth",authRoutes)
app.use("/api/job",jobROutes)
app.use("/api/application",applicationRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log(`Server is Running On http://localhost:${PORT}`)
})