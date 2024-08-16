
import express from "express"
// import isAuthenticated from "../middlewares/isAuthenticated.js";
import { getAdminJobs, getAllJob, getJobId, postJob } from "../Controllers/jobController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/post").post(authMiddleware, postJob);
router.route("/get").get(authMiddleware,getAllJob);
router.route("/getadminjobs").get(authMiddleware,getAdminJobs);
router.route("/get/:id").get(getJobId);


export default router;