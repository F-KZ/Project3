import mongoose from "mongoose";


const url = "mongodb+srv://fantasticfranck:green@twitter.ueclytj.mongodb.net/PR3"

 const connectDatabase = async () => {
    try {
        mongoose.set('strictQuery', false)
        const connect = await mongoose.connect(url)
        console.log(`Mongoose connect : ${connect.connection.host}`);
        
    } catch (error) {
        console.log(`Error : ${error.message}`);
    }

}





export default connectDatabase