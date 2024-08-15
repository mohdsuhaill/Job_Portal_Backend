
import express from "express"
// import isAuthenticated from "../middlewares/isAuthenticated.js";
import { getAdminJobs, getAllJob, getJobId, postJob } from "../Controllers/jobController.js";

const router = express.Router();

router.route("/post").post(postJob);
router.route("/get").get(getAllJob);
router.route("/getadminjobs").get(getAdminJobs);
router.route("/get/:id").get(getJobId);


export default router;