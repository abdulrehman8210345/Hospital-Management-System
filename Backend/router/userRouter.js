import express from "express";
import { addnewAdmin, addnewDoctor, adminLogout, getAllDoctors, getUserDetails, login, patientLogout, patientRegister } from "../controller/userController.js";
import { isAdminAuthorized, isPatientAuthorized } from "../middlewares/auth.js";

const router=express.Router();

router.post("/patient/register",patientRegister);
router.post("/login",login);
router.post("/admin/add",isAdminAuthorized,addnewAdmin);
router.get("/getalldoctors",getAllDoctors);
router.get("/admin/me",isAdminAuthorized,getUserDetails);
router.get("/patient/me",isPatientAuthorized,getUserDetails);
router.get("/admin/logout",isAdminAuthorized,adminLogout);
router.get("/patient/logout",isPatientAuthorized,patientLogout);
router.post("/doctor/add",isAdminAuthorized,addnewDoctor);


export default router;