import express from "express"
// import isAuthenticated from "../middlewares/isAuthenticated.js";
import { getCompany, getCompanyById, registerCompany, updateCompany } from "../Controllers/companyController.js";
import { singleUpload } from "../middlewares/multer.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/companyregister").post(authMiddleware,registerCompany);
router.route("/getAllCompanies").get(authMiddleware,getCompany);
router.route("/getCompanyById/:id").get(authMiddleware,getCompanyById);
router.route("/updateCompany/:id").put(authMiddleware,singleUpload,updateCompany);

export default router;