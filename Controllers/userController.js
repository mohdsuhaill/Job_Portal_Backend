import { User } from "../models/userSchema.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import getDatauri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";

export const register = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, password, role } = req.body;
    // console.log(fullname, email, phoneNumber, password, role);
    
    if (!fullname || !email || !phoneNumber || !password || !role) {
      return res.status(400).json({
        message: "Please Fill all the Register Form",
        success: false,
      });
    }
     const file =req.file;
     const fileUri = getDatauri(file);
     const cloudResponse = await cloudinary.uploader.upload(fileUri.content);

    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        message: "User Already exit with this email",
        success: true,
      });
    }
    const hashedPassword = await bcrypt.hash(password,10);

    await User.create({
      fullname,
      email,
      phoneNumber,
      password: hashedPassword,
      role,
      profile:{
         profilePhoto:cloudResponse.secure_url,
      }
    });
    return res.status(201).json({
      message: "Account Register Successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    // console.log(email, password, role);
    
    if (!email || !password || !role) {
      return res.status(400).json({
        message: "Please Fill all the Login Form",
        success: false,
      });
    }

    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Incorrect email or Password. ",
        success: false,
      });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        message: "Incorrect password ",
        success: false,
      });
    }

    // checking role is correct or not

    if (role !== user.role) {
      return res.status(400).json({
        message: "Account doesn't exist with current role",
        success: false,
      });
    }

    const tokenData = {
      userId: user._id,
    };

    const token = await jwt.sign(tokenData, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    user = {
      _id: user.id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };

    return res
      .status(200)
      .json({
        message: `welocome Back ${user.fullname}`,
        user,
        success: true,
        token:token
      });
  } catch (error) {
    console.log(error);
  }
};

export const logout = async (req,res)=>{
    try {
        return res.status(200).cookie("token","",{maxAge:0}).json({
            message:"logged Out Successfully.",
            success:true
        })
    } catch (error) {
        console.log(error);
        
    }
}

export const updateProfile = async (req,res)=>{
    try {
        const {fullname,email,phoneNumber,bio,skills} = req.body;
        // console.log(fullname,email,phoneNumber,bio,skills);
        
       const file = req.file;

            // cloudinary 
       const fileUri = getDatauri(file)
       const cloudResponse = await cloudinary.uploader.upload(fileUri.content)

        

      
        let skillsArray;
          if(skills){
             skillsArray = skills.split(",");
          }
         
          const userId = req.user.userId ;
          // console.log("userId: "+userId);
          let user =await User.findById(userId);
          // console.log(user);
          if(!user){
            return res.status(400).json({
                message:"user Not Found",
                success:false
            })
          }
          
        //   upadte the data 
        if(fullname)user.fullname = fullname
        if(email)user.email=email
        if(phoneNumber)user.phoneNumber = phoneNumber
        if(bio)user.profile.bio = bio
        if(skills)user.profile.skills = skillsArray
       
    

         // resume will be upadate later
        if(cloudResponse){
          user.profile.resume = cloudResponse.secure_url 
          user.profile.resumerOrginalName = file.originalname
        }

          await user.save();
          user = {
            _id: user.id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile,
          };
        return res.status(200).json({
            message:"Profile Update successfully",
            user,
            success:true,
            
        })
        
    } catch (error) {
        console.log(error);
        
    }
}
