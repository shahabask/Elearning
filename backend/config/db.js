import mongoose from 'mongoose'

const connectDB= async()=>{
    try{
          const  conn= await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
          .then(() => {
            console.log('MongoDB connected');
          })
       
    }catch(error){
           console.log(`mongodb error ${error.message}`)
           process.exit(1)
    }
}

export default connectDB