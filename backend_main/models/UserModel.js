import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: { type: String },
    aadhaarNumber: { type: String, required: true, unique: true },
    
    gender: { type: String, required: true },
    password: { type: String, },
    dobValue: { type: String, required: true }, 
    
}, { timestamps: true });

export default mongoose.model('User', userSchema);
