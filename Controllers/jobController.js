import { Job } from "../models/jobSchema.js";
import { User } from "../models/userSchema.js";

// admin Post job
export const postJob = async (req, res) => {
  try {
      
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
    

    const {
      title,
      description,
      requirements,
      salary,
      location,
      jobType,
      experience,
      position,
      companyId,
    } = req.body;
    // const userId = req.user.userId;
    // console.log(userId);
    

    if (
      !title ||
      !description ||
      !requirements ||
      !salary ||
      !location ||
      !jobType ||
      !experience ||
      !position ||
      !companyId
    ) {
      return res.status(400).json({
        message: "please Fill the all Details",
        success:false
      });
    };
    const job = await Job.create({
        title,
        description,
        requirements: requirements.split(","),
        salary:Number(salary),
        location,
        jobType,
        experienceLevel:experience,
        position,
        company:companyId,
        created_by:userId
    });
    return res.status(200).json({
        message:"New Job Created Successfully",
        job,
        success:true
    })
  } catch (error) {
    console.log(error);
    
  }
};

// for Student 
export const getAllJob = async (req,res)=>{
    
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

    try {
        const keyword = req.query.keyword || "";
        const query ={
            $or:[
                {title:{$regex:keyword, $options:"i"}},
                {description:{$regex:keyword, $options:"i"}},
            ]
        };
        const jobs = await Job.find(query).populate({
            path:"company"
        }).sort({createdAt:-1})
        if(!jobs){
            return res.status(404).json({
                message:"Jobs Not Found ",
                success:false
            })
        }
        return  res.status(200).json({
            jobs,
            success:true
        })
    } catch (error) {
        console.log(error);
        
    }
}
// for  student 
export const getJobId = async (req,res)=>{
    try {
         
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

        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate({
            path:"applications"
        })
        if(!job){
            return res.status(404).json({
                message:"this Job Id Not Found"
            })
        };
        return res.status(200).json({
            job,
            success:true
        })
    } catch (error) {
        console.log(error);
        
    }
}

export const getAdminJobs = async (req,res)=>{
    try {

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

        const adminId = req.user.userId;
        console.log(adminId);
        
        const jobs = await Job.find({created_by:adminId}).populate({
            path:'company',
            createdAt:-1
        })
        if(!jobs){
            return res.status(404).json({
                message:"jobs not Found ",
                success:false
            })
        }
        return res.status(200).json({
            jobs,
            success:true
        })
    } catch (error) {
        console.log(error);
        
    }
}