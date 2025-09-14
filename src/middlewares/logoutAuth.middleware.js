import { asyncHandler } from "../utils/asyncHandler.js";

import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
export const verifyJWT=asyncHandler(async(req,res,next)=> {
    try {
        // in req cookie from cookieParser middleware assigned in app.js file  
        // access token come  in cookies from login api.
        const token = req.cookies?.accesToken ||  req.header("Authorization")?.replace("Bearer ","");
        if (!token ) {
            throw new ApiError(401,"unauthorization request");
        }
        // verify is predifined function, 
        const decodedToken = jwt.verify(token,process.env.ACCESS_TOKEN_SECRECT);
        const user =  await User.findById(decodedToken._id).select("-password -refreshToken");
        if (!user) {
            throw new ApiError(401, "invalid access token");
        }
        // user data assign to req.user next
        req.user=user;
        next();
    } catch (error) {
        throw new ApiError(401,error?.messsage || "invalid access token");
     }
})
