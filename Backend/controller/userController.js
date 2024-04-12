import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import { errorObject } from "../middlewares/errorMiddleware.js";
import User from "../models/userSchema.js";
import { genToken } from "../utils/generateToken.js";
import cloudinary from "cloudinary";

export const patientRegister = catchAsyncError(async (req, res, next) => {
  const {
    firstName,
    lastName,
    email,
    password,
    phone,
    dob,
    gender,
    nic,
    role,
  } = req.body;
  // console.log(req.body);
  if (
    !firstName ||
    !lastName ||
    !email ||
    !password ||
    !phone ||
    !dob ||
    !gender ||
    !nic ||
    !role
  ) {
    return next(errorObject("Please fill all the fields", 400));
  }

  let user = await User.findOne({ email });
  if (user) {
    return next(errorObject("User already exists", 400));
  }
  user = await User.create({
    firstName,
    lastName,
    email,
    password,
    phone,
    dob,
    gender,
    nic,
    role,
  });
  genToken(user, 200, "User Registered successfully", res);
});

export const login = catchAsyncError(async (req, res, next) => {
  const { email, password, confirmPassword, role } = req.body;
  if (!email || !password || !confirmPassword || !role) {
    return next(errorObject("Please fill all the fields", 400));
  }

  if (password !== confirmPassword) {
    return next(
      errorObject("Password and confirm password should be same", 400)
    );
  }

  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(errorObject("Invalid email or password", 400));
  }
  const passwordMatched = await user.comparePassword(password);
  if (!passwordMatched) {
    return next(errorObject("Invalid email or password", 400));
  }
  if (user.role !== role) {
    return next(errorObject("User with this role not found", 400));
  }
  genToken(user, 200, "User logged in successfully", res);
});

export const addnewAdmin = catchAsyncError(async (req, res, next) => {
  const { firstName, lastName, email, password, phone, dob, gender, nic } =
    req.body;
  if (
    !firstName ||
    !lastName ||
    !email ||
    !password ||
    !phone ||
    !dob ||
    !gender ||
    !nic
  ) {
    return next(errorObject("Please fill all the fields", 400));
  }
  const isRegistered = await User.findOne({ email });
  if (isRegistered) {
    return next(
      errorObject(`${isRegistered.role} with this email already exist`)
    );
  }
  const admin = await User.create({
    firstName,
    lastName,
    email,
    password,
    phone,
    dob,
    gender,
    nic,
    role: "Admin",
  });
  res.status(200).json({
    success: true,
    message: "Admin added successfully",
  });
});

export const getAllDoctors = catchAsyncError(async (req, res, next) => {
  const doctors = await User.find({ role: "Doctor" });
  res.status(200).json({ success: true, doctors });
});

export const getUserDetails = catchAsyncError(async (req, res, next) => {
  const user = req.user;
  res.status(200).json({ success: true, user });
});

export const adminLogout = catchAsyncError(async (req, res, next) => {
  res
    .status(200)
    .cookie("adminToken", null, {
      httpOnly: true,
      expires: new Date(Date.now()),
    })
    .json({
      success: true,
      message: "Admin logged out successfully",
    });
});

export const patientLogout = catchAsyncError(async (req, res, next) => {
  res
    .status(200)
    .cookie("patientToken", null, {
      httpOnly: true,
      expires: new Date(Date.now()),
    })
    .json({
      success: true,
      message: "Patient logged out successfully",
    });
});

export const addnewDoctor = catchAsyncError(async (req, res, next) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return next(errorObject("Please upload doctor image", 400));
  }
  const { docAvatar } = req.files;
  const allowedFormats = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
  if (!allowedFormats.includes(docAvatar.mimetype)) {
    return next(errorObject("File type not supported", 400));
  }
  const {
    firstName,
    lastName,
    email,
    password,
    phone,
    dob,
    gender,
    nic,
    doctorDepartment,
  } = req.body;

  if (
    !firstName ||
    !lastName ||
    !email ||
    !password ||
    !phone ||
    !dob ||
    !gender ||
    !nic ||
    !doctorDepartment
  ) {
    return next(errorObject("Please fill all the fields", 400));
  }

  const isRegistered = await User.findOne({ email });
  if (isRegistered) {
    return next(
      errorObject(`${isRegistered.role} with this email already exist`)
    );
  }

  const cloudinaryRes = await cloudinary.uploader.upload(
    docAvatar.tempFilePath
  );

  if (!cloudinaryRes || cloudinaryRes.error) {
    console.error("cloudinary error", cloudinaryRes.error);
    return next(errorObject("Failed to upload doctor image", 500));
  }

  const doctor = await User.create({
    firstName,
    lastName,
    email,
    password,
    phone,
    dob,
    gender,
    nic,
    role: "Doctor",
    doctorDepartment,
    docAvatar: {
      public_id: cloudinaryRes.public_id,
      url: cloudinaryRes.secure_url,
    },
  });
  res.status(200).json({
    success: true,
    message: "New Doctor added successfully",
    doctor,
  });
});
