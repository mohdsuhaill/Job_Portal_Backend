import { login, logout, register, updateProfile } from "../Controllers/userController.js";
import express from "express"
// import isAuthenticated from "../middlewares/isAuthenticated.js";
import { singleUpload } from "../middlewares/multer.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/register").post(singleUpload,register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/profile/update").post(authMiddleware,singleUpload,updateProfile);

export default router;