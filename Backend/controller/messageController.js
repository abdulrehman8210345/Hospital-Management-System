import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import { errorObject } from "../middlewares/errorMiddleware.js";
import  Message  from "../models/messageSchema.js";

export const sendMessage = catchAsyncError(async (req, res, next) => {
  const { firstName, lastName, email, phone, message } = req.body;
  if (!firstName || !lastName || !email || !phone || !message) {
    return next(errorObject("Please fill all the fields", 400));
  }

  await Message.create({ firstName, lastName, email, phone, message });
  res.status(200).json({
    success: true,
    message: "Message sent successfully",
  });
});

export const getAllMessages = catchAsyncError(async (req, res, next) => {
  const messages=await Message.find();
  res.status(200).json({
    success: true,
    messages
  })
})
