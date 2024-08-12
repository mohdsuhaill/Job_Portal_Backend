import { Application } from "../models/applicationSchema.js";
import { Job } from "../models/jobSchema.js";

export const applyjob = async (req,res)=>{
    try {
        const userId = req.id;
        const jobId = req.params.id;
        if(!jobId){
            return res.status(400).json({
                message:"please Enter Your Job ID",
                success:false
            })
        };
        // this code for the user has already applied for the job
        const existingApplication = await Application.findOne({job:jobId,applicant:userId})
        if(existingApplication){
            return res.status(400).json({
                message:"you have Already applied for this jobs",
                success:false
            })
        }

        //  check the jobs Exists
        const job = await Job.findById(jobId);
        if(!job){
            return res.status(404).json({
                message:"job Not found ",
                success:false
            })
        }

        //  create  a new application 
        const newApplication = await Application.create({
            job:jobId,
            applicant:userId,
        })
        job.applications.push(newApplication._id);
        await job.save();
        return res.status(201).json({
            message:"Job Applied Sucessfully",
            success:true
        })
    } catch (error) {
        console.log(error);
        
    }
};


export const getAppliedJobs = async (req,res)=>{
    try {
        const userId = req.id;
        const application = await Application.find({applicant:userId}).sort({createdAt:-1}).populate({
            path:'job',
            options:{sort:{createAt:-1}},
            populate:{
                path:'company',
                options:{sort:{createAt:-1}},
            }

        })
        if(!application){
            return res.status(404).json({
                message:"No Applications",
                success:false
            })
        }

        return res.status(200).json({
            application,
            success:true
        })
    } catch (error) {
        console.log(error);
        
    }
}
//  how many students apply jobs in admin
export const getApplicents = async (req,res)=>{
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate({
            path:'applications',
            options:{sort:{createdAt:-1}},
            populate:{
                path:'applicant'
            }
        })
        if (!job) {
            return res.status(404).json({
                message:'Job not Found ',
                success:false
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

export const updateStatus = async (req,res)=>{
    try {
        const {status}= req.body;
        const applicationId =req.params.id;
        if(!status){
            return res.status(400).json({
                message:"Status Not found ",
                success:false
            })
        }
        //  Find the application by ApplicantId
        const application = await Application.findOne({_id:applicationId});
        if(!application){
            return res.status(404).json({
                message:"Application Not Found",
                success:false
            })
        }
        application.status = status.toLowerCase();
        await application.save();

        return res.status(200).json({
            message:"status upadated Sucessfully",
            success:true
        })

    } catch (error) {
        console.log(error);
        
    }
}