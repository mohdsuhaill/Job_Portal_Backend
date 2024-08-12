import cookieParser from "cookie-parser";
import express from "express";
import dotenv from "dotenv"
import cors from "cors"
import connectDB from "./utils/database.js";
import userRoute from "./routes/userRoute.js";
import companyRoute from "./routes/companyRoute.js";
import jobRoute from "./routes/jobRoute.js";
import applicationRoute from "./routes/applicationRoute.js"

dotenv.config({})
const app = express();

// middleware   

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

const corsOption ={
    origin:'http://localhost:5173',
    credentials:true
}

app.use(cors(corsOption));


// api 
app.use("/api/user",userRoute);
app.use("/api/company",companyRoute);
app.use("/api/job",jobRoute);
app.use("/api/application",applicationRoute);



const PORT =process.env.PORT || 3000;
app.listen(PORT,()=>{
    connectDB();
    console.log(`server running Successfully at port ${PORT} `);
    
})