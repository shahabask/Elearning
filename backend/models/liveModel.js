import { ObjectId } from "mongodb";
import mongoose from "mongoose";
const liveSchema = mongoose.Schema({
    startingTime:{
        type:Date,

    },
    endingTime:{
        type:Date,
    },
    roomId:{
        type:String,
        required:true
    },
    subCategory:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    isExpired:{
        type:Boolean,
        default:false
    },
    status:{
        type:String,
        default:"Not started"
    },
    tutor:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Tutor' 
    }
})

 const Live=mongoose.model('Live',liveSchema)
 export default Live