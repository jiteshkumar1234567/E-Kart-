import mongoose from 'mongoose';

const connectDB = async()=>{
    try{
await mongoose.connect(`${process.env.MONGO_URL}`)
console.log("mongoDB Connected successfully ✅")
    }catch(error){
        console.log("mongoDB connection Fails:", error);
    }
} 

export default connectDB