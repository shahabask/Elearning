import mongoose from "mongoose";

const planSchema=mongoose.Schema({
    price:{
        type:Number,
        required:true
    },
    subscriptionMode:{
        type:String,
        required:true
    },
    benifits:{
        type:Array,
    },
    duration:{
        type:String,
    }
})

const Plan = mongoose.model('Plan',planSchema)

export default Plan