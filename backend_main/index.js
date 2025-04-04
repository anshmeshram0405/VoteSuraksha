import express from 'express';
// import mongoose from "mongoose";
import cors from 'cors';
import connection from './database/db.js';
import Routes from './routes/route.js';
import AdminUser from './models/adminModel.js';

const app = express();


app.use(cors());
app.use(express.json());
// Middleware to parse JSON with increased size limit
// app.use(express.json({ limit: '50mb' })); // Increase limit for JSON payloads
// app.use(express.urlencoded({ limit: '50mb', extended: true })); // Increase limit for URL-encoded data

// Create a new document
const createAdminUser = async () => {
    try {

        const existingAdmin = await AdminUser.findOne(
            { adminuser_name: "admin_voter", password: '123456' }
        );
if(existingAdmin){

}else{

    const newUser = new AdminUser({
        adminuser_name: 'admin_voter',
        password: '123456',
      });
 
      await newUser.save();

}
     
 
      
    } catch (error) {
      console.error('Error creating user:', error);
    } 
  };
  
  // Call the function
  createAdminUser();

app.use("", Routes);

connection();
app.listen(5000,console.log("server stated at 5000........"))
