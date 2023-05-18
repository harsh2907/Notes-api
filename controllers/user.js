import { User } from "../models/user.js";
import bcrypt from 'bcrypt';
import { sendCookie } from "../utils/features.js";
import ErrorHandler, { catchAsyncError } from "../middlewares/error.js";

export const getAllUsers = catchAsyncError(async (req, res) => { 
    const users = await User.find({});
    res.status(200).json({
        success:true,
        users:users
    });
});

export const login = catchAsyncError(async (req, res,next) => { 

    const {email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");

    if (!user) return next(new ErrorHandler("Invalid email or password",404));

    const isMatched = await bcrypt.compare(password,user.password);

    if (!isMatched) return next(new ErrorHandler("Invalid email or password",404));

    sendCookie(user, res, 200);

});

export const register = catchAsyncError(async (req, res) => {

    const { name, email, password } = req.body;
    let user = await User.findOne({ email });

    if (user) return next(new ErrorHandler("User already exists",404));


    const hashedPass = await bcrypt.hash(password, 10);

    user = await User.create({
        name,
        email,
        password: hashedPass
    });

    sendCookie(user, res, 201);
});

export const logout = catchAsyncError(async (req, res) => {
    const isDev = process.env.NODE_ENV === "Development";

    res
    .status(200)
    .cookie("token","",{  
        expires: new Date(Date.now()),
        sameSite: isDev ? "lax" : "none",
        secure: isDev? false : true
    })
    .json({
        success:true,
        user:req.user
    });
 });

export const getMyProfile = (req, res) => { 
    
    res.status(200).json({
        success:true,
        user:req.user
    });
}


