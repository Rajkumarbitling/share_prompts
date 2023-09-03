import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async () => {
    mongoose.set("strictQuery", true);

    if(isConnected){
        return console.log("Mongoose is already connected")
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: 'share_prompt',
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        isConnected = true;
        console.log("DB is connected")
    } catch (error) {
        console.log(error)
    }
}