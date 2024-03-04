import mongoose,{Schema} from "mongoose";
import mongooseAggregatepainatev2 from "mongoose-Aggregate-painate-v2";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const videoSchema=new Schema({
    videoFile:{
        type:String ,// cloudinray url
        required:true
    },
    thumbnail:{
        type:String ,// cloudinray url
        required:true
    },
    title:{
        type:String ,
        required:true
    },
    description:{
        type:String ,
        required:true
    },
    duration:{
        type:Number,//cloudinary url
        required:true
    },
    views:{
        type:Number,
        default:0
    },
    isPublished:{
        type:Boolean,
        default:true
    },
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User"
    }






},{timestamps:true})

videoSchema.plugin(mongooseAggregatePaginate)
export const Video=mongoose.model("Video",videoSchema)