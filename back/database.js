import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config()




 const connectDatabase = async () => {
    try {
        mongoose.set('strictQuery', false)
        const connect = await mongoose.connect(process.env.URL)
        console.log(`Mongoose connect : ${connect.connection.host}`);
        
    } catch (error) {
        console.log(`Error : ${error.message}`);
    }

}





export default connectDatabase