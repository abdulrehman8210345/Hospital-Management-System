import mongoose from "mongoose";
import validator from "validator";

const appointmentSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minLength: [3, "First name must be at least 3 characters long"],
  },
  lastName: {
    type: String,
    required: true,
    minLength: [3, "Last name must be at least 3 characters long"],
  },
  email: {
    type: String,
    required: true,
    validate: [validator.isEmail, "Please provide a valid email"],
  },
  phone: {
    type: String,
    required: true,
    minLength: [11, "Phone number must contain 11 digits"],
    maxLength: [11, "Phone number must contain 11 digits"],
  },
  nic: {
    type: String,
    required: true,
    minLength: [13, "NIC must contain 13 digits"],
    maxLength: [13, "NIC must contain 13 digits"],
  },
  dob: {
    type: Date,
    required: [true, "Date of birth is required"],
  },
  gender: {
    type: String,
    required: true,
    enum: ["Male", "Female"],
  },
  appointment_date: {
    type: Date,
    required: [true, "Appointment date is required"],
  },
  doctorId:{
    type:mongoose.Schema.ObjectId,
    required:true,
  },
  patientId:{
    type:mongoose.Schema.ObjectId,
    required:true,
  },
  department:{
    type:String,
    required:true,
  },
  doctor:{
    firstName:{
      type:String,
      required:true,
    },
    lastName:{
      type:String,
      required:true,
    }
  },
  hasVisited:{
    type:Boolean,
    default:false,
},
  address:{
    type:String,
    required:true,
  },
  status:{
    type:String,
    enum:["Pending","Accepted","Rejected"],
    default:"Pending",
  }

});

export const Appointment=new mongoose.model("Appointment",appointmentSchema);
