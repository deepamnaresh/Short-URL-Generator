import jwt  from "jsonwebtoken";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.models.js";
import {rateLimit} from "express-rate-limit"
import { verify } from "crypto";


const verifyJwt = asyncHandler(async (req,res,next)=>{

    try {
        //find token from req.cookies or from headers(for mobile stuff)
        //header me key "Authorization" or value "Bearer <token>" hoti hai to hum "Bearer " ko hata dete hai to token mil jayega
        const token  = req.cookies?.accessToken || req.headers.Authorization?.replace("Bearer ","")
    
        if(!token){
            throw new ApiError(401,"Unauthorized request")
        }
    
        //verify token from jwt or decode it 
        const decodedToken = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET) 
        //decoded token holds the payload jo hamne access token generate krte time use kiya tha
    
        //find user 
        const user = await User.findById(decodedToken?._id).select("-password -refreshToken")

        //check user
        if(!user){
            throw new ApiError(401,"Invalid Access Token")
        }

        //enject user object in req
        req.user = user
    
        //call next
        next()
    } catch (error) {
        throw new ApiError(401,error?.message || "invalid access token")
    }

});

const verifyAdmin = (req, res, next) => {
    if (req.user.Role === 1) {  // Assuming 1 means admin
        return next();  // Move to the next middleware or route handler
    } else {
        return res.status(403).json({ 
            success: false, 
            message: "Access denied. Admins only." 
        });
    }
}
const contactRateLimiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 10 minutes
    max: 5, // Limit each IP to 5 requests per 10 minutes
    message: { error: "Too many contact requests, please try again later." },
    headers: true,
});

export {verifyJwt, verifyAdmin, contactRateLimiter}