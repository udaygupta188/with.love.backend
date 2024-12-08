const mongoose = require('mongoose'); 
const connectDB = require("../configs/db.config");
const SubRole = require("../modules/admin/subRole/subRole.model");
const Role = require('../modules/admin/role/role.model');

const subRoles = [
    { name: 'Pre-Loved' },
    { name: 'Casual Seller' },
    { name: 'Curator' },
    { name: 'Model' },
    { name: 'Community guide' },
    { name: 'Creator' }
];

// Function to Seed SubRoles with Role ID
const seedSubRole = async () => {
    try {
        await connectDB(); // Ensure the DB is connected

        console.log("Database connected successfully!");

        // Find the "User" role
        const userRole = await Role.findOne({ name: "User" });
        if (!userRole) {
            console.error('Role "User" not found. Please seed roles first.');
            return;
        }

        // Assign the role ID to relevant subRoles
        const updatedSubRoles = subRoles.map((subRole) => {

                return { ...subRole, roleId: userRole._id };
            return subRole;
        });

        // Check if subRoles already exist
        const existingSubRoles = await SubRole.find({});
        if (!existingSubRoles.length) {
            await SubRole.insertMany(updatedSubRoles);
            console.log('SubRoles seeded successfully with role IDs.');
        } else {
            console.log('SubRoles already seeded.');
        }
    } catch (err) {
        console.error('Error seeding subRoles:', err);
    } finally {
        mongoose.disconnect();
    }
};

seedSubRole();

module.exports = seedSubRole;
