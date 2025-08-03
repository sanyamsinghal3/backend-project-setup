import mongoose, { Schema } from "mongoose";
import mongooseAggreatePagnation from "mongoose-aggregate-paginate-v2";

const videoSchema = new Schema({
    videoFile:{
        type:String
    },
    thumbnail:{
        type:String
    },
    title:{
        type:String
    },
    description:{
        type:String
    },
    duration:{
        type:Number
    },
    views:{
        type:Number,
        default:true
    },
    owner:{
        type:Schema.Types.ObjectId,
        ref:User
    }

},{timestamps:true})

videoSchema.plugin(mongooseAggreatePagnation);
export const Video = mongoose.model("video",videoSchema)