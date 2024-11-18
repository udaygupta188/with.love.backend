const mongoose = require('mongoose');
const connectDB = require('../configs/db.config');
const Role = require('../modules/admin/role/role.model');

const roles = [
    { name: 'User' },
    { name: 'Brand' },
];

const seedRole = async () => {
    try {
        // Establish a fresh connection to MongoDB
        // await connectDB();
        // console.log('Connected to MongoDB.');

        // Check for existing roles
        const existingRoles = await Role.find({});
        if (existingRoles.length === 0) {
            // Insert roles if none exist
            await Role.insertMany(roles);
            console.log('Roles seeded successfully!');
        } else {
            console.log('Roles already seeded. Skipping...');
        }
    } catch (err) {
        console.error('Error seeding roles:', err);
    } finally {
        // // Always close the connection
        // await mongoose.connection.close(); // Ensures sessions are cleaned up
        // console.log('Disconnected from MongoDB.');
    }
};

seedRole();

module.exports = seedRole;
