import express from "express"
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { applyjob, getApplicents, getAppliedJobs, updateStatus } from "../Controllers/applicationController.js";



const router = express.Router();

router.route("/apply/:id").get(isAuthenticated,applyjob);
router.route("/get").get(isAuthenticated,getAppliedJobs);
router.route("/:id/applicants").get(isAuthenticated,getApplicents);
router.route("/status/:id/update").post(isAuthenticated,updateStatus);

export default router;