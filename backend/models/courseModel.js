
import mongoose from "mongoose";
const courseSchema = mongoose.Schema({
      course: {
        type: String,
        required: true,
        unique: true,
      },
      category:{
          type:mongoose.Schema.Types.ObjectId,
           ref: 'Category' 
      },
     tutor:{
        type:mongoose.Schema.Types.ObjectId,
           ref: 'Tutor' 
     },
     subCategory:{
      type:String,
      required:true
     },
     videos:[
      {
         title:{
            type:String,
            
         },
         description:{
            type:String,
            
         },
         videoUrl:{
            type:String,
            
         },
         
      } ]
     ,
     description:{
      type:String,
      required:true
     },
     isActive:{
      type:Boolean,
      default:true
     },
     image:{
      type:String,
      default:null
     },
    rating:[
      {
         user: {type:mongoose.Schema.Types.ObjectId,
         ref: 'User' },
         value:{
            type:Number
         },
         review:{
            type:String,
            
         }
      }
    ]
   
    })


    const Course = mongoose.model('Course',courseSchema)

    export default Course