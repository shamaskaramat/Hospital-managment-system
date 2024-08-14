import mongoose from "mongoose";


const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI).then(() => {

            console.log("connected to Mongo DataBase")
        }).catch((err) => {
            console.log("error in connection", err)
        })
    } catch (error) {
        console.log(`Error in Mongodb ${error}`)
    }
}
export default connectDB;