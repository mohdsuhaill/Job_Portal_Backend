import express from "express"
// import isAuthenticated from "../middlewares/isAuthenticated.js";
import { applyjob, getApplicents, getAppliedJobs, updateStatus } from "../Controllers/applicationController.js";
import authMiddleware from "../middlewares/authMiddleware.js";



const router = express.Router();

router.route("/apply/:id").get(authMiddleware,applyjob);
router.route("/get").get(authMiddleware,getAppliedJobs);
router.route("/:id/applicants").get(authMiddleware,getApplicents);
router.route("/status/:id/update").post(authMiddleware, updateStatus);

export default router;