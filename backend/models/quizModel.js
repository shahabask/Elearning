
import { ObjectId } from "mongodb";
import mongoose from "mongoose";
const quizSchema = mongoose.Schema({
    name:{
        type:String
    },
    questions:[{
        question:{  type:mongoose.Schema.Types.ObjectId,
            ref: 'questionBank' }
    }],
    lastDate:{
        type:Date,
    },
   time:{
    type:Number
   },
   subCategory:{
    type:String,
   },
   expired:{
    type:Boolean,
    default:false
   },
   tutor:{
    type:mongoose.Schema.Types.ObjectId,
            ref: 'Tutor'
   }
   
})





const Quizzes = mongoose.model('Quizze',quizSchema)

export default Quizzes;