const mongoose = require('mongoose');
const connectDB = require("../configs/db.config");
const SubRole = require("../modules/admin/subRole/subRole.model");

const subRoles = [
    { name: 'Pre-Loved'},
    { name: 'Casual Seller'},
    { name: 'Curator'},
    { name: 'Model'},
    { name: 'Community guide'},
    { name: 'Creator'}
];

// Insert sub-roles

console.log('Sub roles seeded successfully!');



// Function to Seed Admin Data
const seedSubRole = async () => {
    try {
 
      const subrole = await SubRole.find({});
      if(!subrole.length){
        await SubRole.insertMany(subRoles);
        console.log('SubRole seeded successfully');
      }
      else{
        console.log("Sub role already seeded")
      }
 
    } catch (err) {
      console.error('Error seeding subrole:', err);
    } finally {
      // mongoose.disconnect();
    }
  };
  seedSubRole();
  module.exports = seedSubRole