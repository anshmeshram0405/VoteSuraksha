import mongoose from "mongoose";

const connection = async ()=>{

 await mongoose.connect("mongodb://127.0.0.1:27017/voting-system", {
    // useNewUrlParser: true,
    // useUnifiedTopology: true
}, console.log("database connected successfully ...."))
}


export default connection ;