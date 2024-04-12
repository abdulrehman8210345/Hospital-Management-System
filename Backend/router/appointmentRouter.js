import express from "express";
import { isAdminAuthorized, isPatientAuthorized } from "../middlewares/auth.js";
import { deleteAppointment, getAllAppointments, postAppointment, updateAppointment } from "../controller/appointmentController.js";

const router=express.Router();

router.post("/post",isPatientAuthorized,postAppointment);
router.get("/getall",isAdminAuthorized,getAllAppointments);
router.put("/update/:id",isAdminAuthorized,updateAppointment);
router.delete("/delete/:id",isAdminAuthorized,deleteAppointment);



export default router;