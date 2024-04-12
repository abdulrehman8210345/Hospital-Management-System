import mongoose from "mongoose";
import validator from "validator"; 

const messageSchema= new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        minLength:[3,"First name must be at least 3 characters long"],
    },
    lastName:{
        type:String,
        required:true,
        minLength:[3,"Last name must be at least 3 characters long"],
    },
    email:{
        type:String,
        required:true,
        validate:[validator.isEmail,"Please provide a valid email"],
    },
    phone:{
        type:String,
        required:true,
        minLength:[11,"Phone number must contain 11 digits"],
        maxLength:[11,"Phone number must contain 11 digits"],
    },
    message:{
        type:String,
        required:true,
        minLength:[10,"Message must be of 10 characters"],
    },
    

});

export default new mongoose.model("Message",messageSchema);