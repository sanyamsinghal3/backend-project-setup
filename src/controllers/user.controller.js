import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"; // (..) one directory back
import { User } from "../models/user.model.js"; // mongoose user
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req,res) => {
        
    // data destructure data form request body for reqister user
    const {fullName, email, username, password} = req.body;
    console.log("email",  email);
    // set validation
    if(fullName == "" && email =="" && username=="" && password ==""){
        throw new ApiError(400,"all form  fields are required" )
    }

    if([fullName, email, username, password].some((allfields) => 
        allfields ?.trim() ==""))  {
         throw new ApiError(400,"all form  fields are required" )
    }
    /*// check Username or email both exit or not, import user model
    
        const userExist = User.findOne({email})
    */
    const userExist = User.findOne({
        $or:[{username},{email}]
    })
    if (userExist) {    
        throw new ApiError(400,"username or email alreday exist.")
    }
    // file upload using file
    const avatvarLocalPath = req.files?.avatar[0]?.path;
    const coverLocalPath = req.files?.coverImage[0]?.path;
    if (!avatvarLocalPath) {
        throw new ApiError(400,"Avtar files is required");
    }
     
    const avatr = await uploadOnCloudinary(avatvarLocalPath);
    const coverImage = await uploadOnCloudinary(coverLocalPath);
    if(!avatr){
        throw new ApiError(400,"Avtar files is required")
    }
    // Register User in db
    const userData = await User.create({
        fullName,
        avatar:avatar.url,
        coverImage:coverImage?.url || "",
        email,
        password,
        username:username.toLowerCase(),
    });

    const createdUser = User.findById(userData._id).select(
        "-refreshToken -password"
    )
    if (!createdUser) {
         throw new ApiError(400,"something wrong while register user")
    }
    new ApiResponse(200,createdUser,"user registered successfully")

});

export {registerUser};