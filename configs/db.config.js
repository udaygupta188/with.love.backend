require('dotenv').config();
const mongoose = require('mongoose');

const connectDB = async (DB) => {
    console.log('Connecting to MongoDB...');
    const defaultDB = process.env.MONGO_URI;

    if (!defaultDB && !DB) {
        console.error('No MongoDB connection string found. Please set MONGO_URI in your .env file.');
        process.exit(1);
    }

    const databaseURL = DB || defaultDB;

    try {
        // Connect to MongoDB
        const conn = await mongoose.connect(databaseURL, {
            socketTimeoutMS: 45000,
        });
        console.log(`MongoDB Connected: ${conn.connection.host}`);

        // Import and execute seeders dynamically
        console.log('Running seeders...');
       if(conn){

        // await import('../seed/adminSeeder.js');
        // await import('../seed/RoleSeeder.js');
    //    await import('../seed/subRoleSeeder.js');
       }
        
        console.log('Seeders executed successfully.');

    } catch (error) {
        console.error(`Error connecting to MongoDB: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;
