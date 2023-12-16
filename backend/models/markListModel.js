

import mongoose from "mongoose";
const markListSchema = mongoose.Schema({
    studentId:{
       type:mongoose.Schema.Types.ObjectId,
       ref:'User'
    },
    quiz:[
        {quizId:{type:mongoose.Schema.Types.ObjectId,
            ref: 'Quizze' },
        
       correctAnswers:{
        type:Number,
       },
      submissionTime:{
         type:Date,
         
      } }
    ],
      assignment:[
      {
         assignmentId:{type:mongoose.Schema.Types.ObjectId,
      ref:'Assignments'
      },
      MarkScored:{
         type:Number,
         default:null
      },
      
      checked:{
         type:Boolean,
         default:false
      },
      pdf:{
         type:String
      }
      },
      
      ]

})

const MarkList = mongoose.model('MarkList',markListSchema)

export default MarkList;