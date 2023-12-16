import mongoose from "mongoose";
import bcrypt from 'bcryptjs'
import { ObjectId } from "mongodb";
const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true,
      },
      secondName:{
        type:String,
        required:false
      },
      email: {
        type: String,
        required: true,
        unique: true,
      },
      
      password: {
        type: String,
        required: true,
      },
      image:{
        type:String,
        default:null 
      },
      phone:{
        type:Number,
      },
      otp:{
        type:Number,
        default:null
      },
      isBlocked:{
        type:Boolean,
        default:false
      },
      subscription:{
       mode:{
        type:ObjectId
       },
       startDate:{
        type:Date,
        
       },
       endDate:{
        type:Date
       },
       watchHistory:[]
      }
    },
   
    {
        timestamps: true,
      })

      userSchema.pre('save', async function(next){
        if(!this.isModified('password'))
        next()

        const salt= await bcrypt.genSalt(10)
        this.password=await bcrypt.hash(this.password,salt)
      })
        userSchema.methods.matchPassword =async function(enteredPassword){
          return await bcrypt.compare(enteredPassword,this.password)
        }
      const User = mongoose.model('User',userSchema)

      export default User