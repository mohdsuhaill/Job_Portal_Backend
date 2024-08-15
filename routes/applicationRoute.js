import express from "express"
// import isAuthenticated from "../middlewares/isAuthenticated.js";
import { applyjob, getApplicents, getAppliedJobs, updateStatus } from "../Controllers/applicationController.js";



const router = express.Router();

router.route("/apply/:id").get(applyjob);
router.route("/get").get(getAppliedJobs);
router.route("/:id/applicants").get(getApplicents);
router.route("/status/:id/update").post(updateStatus);

export default router;