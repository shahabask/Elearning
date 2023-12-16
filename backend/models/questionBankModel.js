import mongoose from "mongoose";
const questionBankSchema = mongoose.Schema({

      question:{
        type:String,
        required:true
      },
      subCategory:{
        type:String, 

      },
      option1:{
        type:String,
        required:true
      },
      option2:{
        type:String,
        required:true
      },
      option3:{
        type:String,
        required:true
      },
      option4:{
        type:String,
        required:true
      },
      answer:{
        type:String,
        required:true
      }

})

const QuestionBank = mongoose.model('questionBank',questionBankSchema)

export default QuestionBank;