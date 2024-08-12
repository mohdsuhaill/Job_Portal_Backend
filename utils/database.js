import mongoose from "mongoose";

const connectDB = async () =>{

    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("MongoDB Connected Sucessfully");
        
    } catch (error) {
        console.log("MongoDB Not Connected");
        
    }
}

export default connectDB;