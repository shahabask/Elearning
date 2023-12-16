
// import { ObjectId } from "mongodb";
import mongoose from "mongoose";
const assignmentSchema = mongoose.Schema({ 
   name:{
    type:String, 
   },
   constraints:[
    
   ],
   startingDate:{
      type:Date
   },
   endingDate:{
    type:Date
   },
   outOf:{
      type:Number
   },
   status:{
      type:String,
      default:'started'
      
   },
   tutorId:{
    type:mongoose.Schema.Types.ObjectId,
         ref: 'Tutor'
   },

   subject:{
      type:String
   }
})

const Assignments = mongoose.model('Assignment',assignmentSchema)

export default Assignments;