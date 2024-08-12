import { Company } from "../models/companySchema.js";
import getDatauri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";



export const registerCompany = async (req,res) => {
    try {
        const {companyName}=req.body;
        if(!companyName){
            return res(400).json({
                message:"please Enter Your Company Name. ",
                success:false
            })
        }

        let company = await Company.findOne({name:companyName});
        if(company){
            return res.status(400).json({
                message:"You can't Register same Company.",
                success:false
            })
        };

        company = await Company.create({
            name:companyName,
            userId:req.id
        });
        return res.status(200).json({
            message:"Company register Successfully.",
            company,
            success:true
        })
    } catch (error) {
        console.log(error);
        
    }
}


export const getCompany = async (req,res)=>{
    try {
       const userId = req.id;
       const companies = await Company.find({userId});
       if(!companies){
        return res.status(404).json({
            message:"companies Not Found",
            success:false
        })
       } 
       return res.status(200).json({
        companies,
        success:true
       })
    } catch (error) {
        console.log(error);
        
    }
}

export const getCompanyById = async (req,res)=>{
    try {
        const companyId = req.params.id;
        const company = await Company.findById(companyId);
        if(!company){
            return res.status(404).json({
                message:"company  ID Not Found",
                success:false
            })
        }
        return res.status(200).json({
            company,
            success:true
        })
    } catch (error) {
        console.log(error);
        
    }
}

export const updateCompany = async (req,res)=>{
    try {
        const {name,description,website,location} =req.body;
        console.log(name,description,website,location);
        
        const file = req.file;
        //  cld
        const fileUri = getDatauri(file);
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
        const logo = cloudResponse.secure_url;

        const updateData = {name,description,website,location,logo};
        const company = await Company.findByIdAndUpdate(req.params.id,updateData,{new: true});

        if(!company){
            return res.status(404).json({
                meessage:"company Not update",
                success: false
            })
        }

        return res.status(200).json({
            message:"Company Information Updated Successfully",
            success:true
        })

    } catch (error) {
        console.log(error);
        
    }
}