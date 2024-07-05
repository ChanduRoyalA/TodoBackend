import mongoose from 'mongoose';


const ConnectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_SECRET);
        console.log("Connected to DB")
    } catch (error) {
        console.log(`Error in connecting to DB: ${error}`);
    }
}

export default ConnectDb;