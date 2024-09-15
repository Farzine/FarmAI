import mongoose from "mongoose";

export function connect(){
    mongoose.connect(process.env.MONGO_URI as string, {
        tls: true,
        ssl: true,
    }).then(() => {
        console.log("Connected to MongoDB");
    }).catch((error) => {
        console.log("Error connecting to MongoDB", error);
    });
}