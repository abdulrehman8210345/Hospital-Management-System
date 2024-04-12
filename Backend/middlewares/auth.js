import jwt from "jsonwebtoken";
import { catchAsyncError } from "./catchAsyncError.js";
import { errorObject } from "./errorMiddleware.js";
import User from "../models/userSchema.js";

export const isAdminAuthorized = catchAsyncError(async (req, res, next) => {
    const token = req.cookies.adminToken;
    if(!token){
        return next(errorObject("Admin not authenticated", 401));
    };

    const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY);
    req.user=await User.findById(decoded.id);
    if(req.user.role!=="Admin"){
        return next(errorObject(`${req.user.role} not authorized`, 403));
    };

    next();

});

export const isPatientAuthorized = catchAsyncError(async (req, res, next) => {
    const token = req.cookies.patientToken;
    if(!token){
        return next(errorObject("Patient not authenticated", 401));
    };

    const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY);
    req.user=await User.findById(decoded.id);
    if(req.user.role!=="Patient"){
        return next(errorObject(`${req.user.role} not authorized`, 403));
    };

    next();

});
