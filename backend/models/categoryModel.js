
import mongoose from "mongoose";
import bcrypt from 'bcryptjs'
const categorySchema = mongoose.Schema({
      categoryName: {
        type: String,
        required: true,
        unique: true,
      },
      
     active:{
        type:Boolean,
        default:true
     },
     subCategories:{
      type:Array,
      default:[]
     },
     image: {
      type: String,
      default:null
    },
 
    })


    const Category = mongoose.model('Category',categorySchema)

    export default Category