import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"; // (..) one directory back
import { User } from "../models/user.model.js"; // mongoose user
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const generateAccessTokenAndRefreshTokens   =   async(userId) => {
    try {
        console.log("asas",userId);
        const userdt = await User.findById(userId);
        const accessToken = userdt.generateAccessToken();
        const refreshToken = userdt.generateRefreshToken();
        userdt.refreshToken = refreshToken; // update refresh token into db
        await userdt.save({validateBeforeSave:false}); // {validateBeforeSave:false} remove moonsose model requred validation.
        return {accessToken,refreshToken }
    } catch (error) {
        throw new ApiError(500,"Something went wrong while genrate tokens")
    }
}

const registerUser = asyncHandler(async (req,res) => {
        /*const currentDb = await User.db;
        console.log(userssExist);*/
        
    // data destructure data form request body for reqister user
    const {fullName, email, username, password} = req.body;
    //console.log("email",  email);
    // set validation
    if(fullName == "" && email =="" && username=="" && password ==""){
        throw new ApiError(400,"all form  fields are required" )
    }
    // second type for check validations
    if([fullName, email, username, password].some((allfields) => 
        allfields ?.trim() ==""))  {
         throw new ApiError(400,"all form  fields are required" )
    }
    /*// check Username or email both exit or not, import user model
        const userExist = User.findOne({email})
    */
    const userExist = await User.findOne({
        $or:[{username},{email}]
    })

     if (userExist) {    
        throw new ApiError(400,"username or email alreday exist.")
    }
    // file upload using file
    const avatvarLocalPath = req.files?.avatar[0]?.path;
    const coverLocalPath = req.files?.coverImage[0]?.path;
        //console.log(avatvarLocalPath,coverLocalPath);

    if (!avatvarLocalPath) {
        throw new ApiError(400,"Avtar files is required");
    }
     
    const avatr      = await uploadOnCloudinary(avatvarLocalPath);
    const coverImage = await uploadOnCloudinary(coverLocalPath);
    if(!avatr){
        throw new ApiError(400,"Avtar files is required")
    }
   // console.log(coverImage,avatr);
    
    // Register User in db
    const userData = await User.create({
        fullName,
        avatar:avatr.url,
        coverImage:coverImage?.url || "",
        email,
        password,
        username:username.toLowerCase(),
    });

    const createdUser = await User.findById(userData._id).select(
        "-refreshToken -password"
    )
    // removed from select query "-refreshToken -password"
    if (!createdUser) {
         throw new ApiError(400,"something wrong while register user")
    }
    new ApiResponse(200,createdUser,"user registered successfully")

});

// function for login.
const loginUser = asyncHandler(async(req,res)=>{
    // todos for login 
    // req body data
    // login with username or emial both
    // find the user
    //chek passeord
    //generate access token and refresh token
    // send token in cookie
    const {email,username,password} =   req.body;
    // validation
    if (!email || !password) {
        throw new ApiError(400, "username or email is required");
    }
    const user_data =  await User.findOne({
            $or:[{email}] //       $or:[{username},{email}]

    });

    if (!user_data) {
        throw new ApiError(404,"User does not exist")
    }
    const isPasswordValid = await user_data.isPasswordCorrect(password);
    if (!isPasswordValid) {
        throw new ApiError(401,"Password is incorrect.")
    }
    // call function to get access and refresh token
    const {accessToken,refreshToken}=await generateAccessTokenAndRefreshTokens(user_data._id);

    // send cookies to fronternd,  below parameter define cookie modified by only server side not from frontend 

    
const loggedInUser = await User
  .findById(user_data._id)
  .select("-password -refreshToken")
  ;  
    const options = {
        httpOnly:true, 
        secure:true
    }
    // we set cookie  for web frontend alos send data in response for mobile app
  
     return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
        new ApiResponse(
            200, 
            {
                user: loggedInUser, accessToken, refreshToken
            },
            "User logged In Successfully"
        )
    )


});

const logOutUser = asyncHandler(async (req,res) => {
    //todo- remove cookie
   return  options = {
        httpOnly:true, 
        secure:true
    }

});
export {registerUser,loginUser,logOutUser};