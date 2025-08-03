import { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        lowecase:true,
        trim:true,
        index:true,
    },
    email: {
        type:String,
        required:true,
        trim:true,
        index:true
    },
    fullName:{
        type:String,
        required:true,
        trime:true,
    },
    avatar:{
        type:string, // cloudnary url
        required:true,
    },
    coverImage:{
        type:String,
    },
    watchHistory:[{
        type:Schema.Types.ObjectId,
        ref:Video
    }],
    "password":{
        type:String,
        required:[true,'password is required']
    },
    refreshToken:{
        type:String
    }
},{timestamps:true}
)
// used Hooks featur
userSchema.pre("save",async function(next) {
    if (!this.isModified("password")) return next();
    this.password=bcrypt.hash(this.password,10);
    next();
})

// define method behalf of mongoose db. we can multiple methods
userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password,this.password)
}
// 2nd methods for jwt token
userSchema.methods.generateAccessToken=function(){
    jwt.sign(
    {
        _id:this._id,
        emial:this.email,
        fullName:this.fullName
    },
    process.env.ACCESS_TOKEN_SECRET,{
        expiresIn:process.env.ACCESS_TOKEN_EXPIRY
    }
    )
}

userSchema.methods.generateRefreshToken=function(){
    jwt.sign(
        {
            _id:this._id
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn:process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}


export const User = mongoose.model("User",userSchema)