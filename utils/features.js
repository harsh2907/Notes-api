import jwt from "jsonwebtoken";

export const sendCookie = (user,res,statusCode = 200) => {
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    const isDev = process.env.NODE_ENV === "Development";

    res.status(statusCode)
        .cookie("token", token, {
            maxAge: 1000 * 60 * 60 * 24 * 30, //30 days
            httpOnly: true,
            sameSite: isDev ? "lax" : "none",
            secure: isDev? false : true
        })
        .json({
            success: true,
            message: token
        })

}