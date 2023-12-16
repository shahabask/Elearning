import mongoose from 'mongoose'

const connectDB= async()=>{
    try{
          const  conn= await mongoose.connect('mongodb://shahabas123:1234@ac-j0buk9g-shard-00-00.lb49czb.mongodb.net:27017,ac-j0buk9g-shard-00-01.lb49czb.mongodb.net:27017,ac-j0buk9g-shard-00-02.lb49czb.mongodb.net:27017/?ssl=true&replicaSet=atlas-132d51-shard-0&authSource=admin&retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
          .then(() => {
            console.log('MongoDB connected');
          })
       
    }catch(error){
           console.log(`mongodb error ${error.message}`)
           process.exit(1)
    }
}

export default connectDB