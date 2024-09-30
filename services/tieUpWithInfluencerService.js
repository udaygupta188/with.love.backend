const BrandCuratorInteraction = require("../models/BrandCuratorInteractionModel");
const Brand = require("../models/brandModel");
const TieUp = require("../models/tieUpModel");
const User = require("../models/userModel");


// Function to record a tie-up attempt between a brand and an influencer
async function tieUpWithInfluencer(brandId, influencerId) {
  try {
    // Find existing tie-up
    let tieUp = await TieUp.findOne({ brand: brandId, influencer: influencerId });

    if (tieUp) {
      // If the tie-up already exists, increment the contact count and update the last contacted time
      tieUp.contactCount += 1;
      tieUp.lastContactedAt = Date.now();
    } else {
      // Create a new tie-up if it doesn't exist
      tieUp = new TieUp({
        brand: brandId,
        influencer: influencerId,
        contactCount: 1
      });
    }

    await tieUp.save();

    // Add the tie-up to the brand's record
    await Brand.findByIdAndUpdate(brandId, { $addToSet: { tieUps: tieUp._id } });

    console.log('Brand successfully tied up with the influencer.');
  } catch (error) {
    console.error('Error tying up with influencer:', error);
  }
}


// Function to log brand interaction with curator
async function logBrandInteraction(brandId, curatorId, message = '') {
  try {
    const brand = await Brand.findById(brandId);
    const curator = await User.findById(curatorId);
    
    if (!brand || !curator) {
      throw new Error('Brand or Curator not found');
    }

    const interaction = new BrandCuratorInteraction({
      brand: brandId,
      curator: curatorId,
      message,
      status: 'contacted' // Or 'pending' depending on the logic
    });

    await interaction.save();
    console.log('Brand interaction logged successfully');
  } catch (error) {
    console.error('Error logging brand interaction:', error);
  }
}

module.exports={
  tieUpWithInfluencer,
  logBrandInteraction
}