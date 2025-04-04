
// const { generateFaceEmbedding } = require('../utils/faceRecognition'); // Import utility for face processing

import User from "../models/UserModel.js";
import AdminUser from "../models/adminModel.js";

export const registerUser = async (req, res) => {
    const data = req.body;
    
    try{
       
        const existingUser = await User.findOne({ aadhaarNumber: data.aadhaarNumber });

        if (existingUser) {
          // If the Aadhaar number exists, return a message
          return res.status(400).json({ message: "Aadhaar number already exists in the database." });
        }

        const newUser = new User(data);

        await newUser.save();
        res.send(data);

    }catch(err){
        res.json({message: err.message})
    }
};




export const loginByAdmin = async (req, res) => {
    const {formData} = req.body;
    console.log(formData, formData.password,"===========");
    try{
       
        const existingAdmin = await AdminUser.findOne(
            { adminuser_name: formData.adminuser_name, password: formData.password }
        );

        if (existingAdmin) {
       
          return res.json({ message: "Admin login successfully!",success: true });
         
        }else{
           return res.send({message:"you not able to login, due to invaild credentials", success: false});
        }


    }catch(err){
        res.json({message: err.message})
    }
};