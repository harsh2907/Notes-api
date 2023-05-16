class ErrorHandler extends Error{
    constructor(message,statusCode){
        super(message);
        this.statusCode = statusCode;
    }
}

export const errorMiddleware = (err,req,res,next) =>{
    err.message = err.message || "Internal Server error"
    err.statusCode = err.statusCode || 500

    return res.statusCode(err.statusCode).json({
        success:false,
        message:err.message
    })
}

export const catchAsyncError = (passedFunction) => (req,res,next)=>{
    Promise.resolve(passedFunction(req,res,next)).catch(next)
}

export default ErrorHandler;