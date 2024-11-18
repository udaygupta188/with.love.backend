const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const connectDB = require('../configs/db.config');
const Admin = require('../modules/admin/adminProfile/adminProfile.model');


const admins = [
  {
    name: 'Admin 1',
    email: 'admin@gmail.com',
    username: 'admin1',
    email_verified_at: new Date(),
    password: '123456',  // Plain text password
    role: 'admin',
    status: 'active',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: 'Admin 2',
    username: 'manager2',
    email: 'manager@gmail.com',
    email_verified_at: new Date(),
    password: '123456',  // Plain text password
    role: 'manager',
    status: 'active',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

// Function to hash passwords
const hashPasswords = async (admins) => {
  for (const admin of admins) {
    const salt = await bcrypt.genSalt(10);
    admin.password = await bcrypt.hash(admin.password, salt);
  }
};

// Function to Seed Admin Data
 const seedAdmins = async () => {
  try {

    await hashPasswords(admins);
    await Admin.deleteMany();
    const insertedAdmins = await Admin.insertMany(admins);
    console.log('Admins seeded successfully');
  } catch (err) {
    console.error('Error seeding admins:', err);
  } finally {
    // mongoose.disconnect();
  }
};

// Run the Seeder
seedAdmins();
module.exports = seedAdmins
