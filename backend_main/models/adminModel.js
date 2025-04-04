import mongoose from 'mongoose';

const adminSchema = new mongoose.Schema({
   adminuser_name: { type: String, required: true },
   password: { type: String},
});


export default mongoose.model("AdminUser", adminSchema);