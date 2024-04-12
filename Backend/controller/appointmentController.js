import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import { errorObject } from "../middlewares/errorMiddleware.js";
import { Appointment } from "../models/appointmentSchema.js";
import User from "../models/userSchema.js";

export const postAppointment=catchAsyncError(async(req,res,next)=>{
    const {firstName,lastName,email,phone,nic,dob,gender,department,appointment_date,address,doctor_firstName,doctor_lastName,hasVisited} =req.body;
    if(!firstName || !lastName || !email || !phone || !nic || !dob || !gender || !department || !appointment_date || !address || !doctor_firstName || !doctor_lastName){
        return next(errorObject("Please fill all the fields", 400));
    };
    const isDoctorExist= await User.find({
        firstName:doctor_firstName,
        lastName:doctor_lastName,
        role:"Doctor",
        doctorDepartment:department
    });
    // means one and only one doctor must exist so that appointment can take place in order to avoid any conflict
    if(isDoctorExist.length===0){
        return next(errorObject("Doctor not found", 400));
    }

    if(isDoctorExist.length >1){
        return next(errorObject("Doctors conflict! Please contact through email or phone", 400));
    }

    const doctorId = isDoctorExist[0]._id;
    const patientId=req.user._id;

    const appointment=await Appointment.create({
        firstName,
        lastName,
        email,
        phone,
        nic,
        dob,
        gender,
        department,
        appointment_date,
        doctor:{
            firstName:doctor_firstName,
            lastName:doctor_lastName
        },
        hasVisited,
        address,
        doctorId,
        patientId
        
    })

    res.status(200).json({
        success:true,
        message:"Appointment sent successfully",
        appointment
    })
});

export const getAllAppointments=catchAsyncError(async(req,res,next)=>{
    const appointments=await Appointment.find();
    res.status(200).json({
        success:true,
        appointments
    })
});

export const updateAppointment=catchAsyncError(async(req,res,next)=>{
    const {id}=req.params;
    let appointment=await Appointment.findById(id);
    if(!appointment){
        return next(errorObject("Appointment not found", 404));
    }

    appointment=await Appointment.findByIdAndUpdate(id,req.body,{
        new:true,
        runValidators:true,
        useFindAndModify:false
    });

    res.status(200).json({
        success:true,
        message:"Appointment updated successfully",
        appointment
    })
});

export const deleteAppointment=catchAsyncError(async(req,res,next)=>{
    const {id}=req.params;
    let appointment=await Appointment.findById(id);
    if(!appointment){
        return next(errorObject("Appointment not found", 404));
    }
    await appointment.deleteOne();
    res.status(200).json({
        success:true,
        message:"Appointment deleted successfully",
    })
})