export const genToken = (user,statusCode,message,res)=>{
    const token=user.generateToken();
    const cookieName= user.role ==="Admin" ? "adminToken" : "patientToken";

    // console.log(token);

    res.status(statusCode).cookie(cookieName,token,{
        expires:new Date(Date.now() + process.env.COOKIE_EXPIRE * 24*60*60*1000),
        httpOnly:true,
        secure:true,
        sameSite:"None"
    }).json({
        success:true,
        message,
        user,
        token,
    })
}