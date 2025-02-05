const bcrypt = require('bcrypt');
const { apiErrorResponse, HTTP_STATUS } = require('./responseHelper');
const { User } = require('../modules/user/userProfile/userProfile.model');
const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS) || 10; // Default to 10 if SALT_ROUNDS is not defined


// Function to hash passwords
const hashPasswords = async (users) => {
    try {
        for (const user of users) {
            const salt = await bcrypt.genSalt(SALT_ROUNDS);
            const hashedPassword = await bcrypt.hash(user.password, salt);
            user.password = hashedPassword;
        }
    } catch (err) {
        console.error('Error hashing passwords:', err);
        throw err; // Throw error to handle in calling function
    }
};

const generateSlug = (text) => {
    return text
        .toString()
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9 -]/g, '') // Remove special characters
        .replace(/\s+/g, '-') // Replace spaces with -
        .replace(/-+$/g, ''); // Remove trailing -
};

const checkFollowers =async (req, res, next) => {
    try {

        // const userId = req.body.userId || req.params.userId; 
        const userId = req.user._id;
        const user = await User.findById(userId).populate('role');
        console.log(user,  req.body);
         // Check if user exists
         if (!user) {
            return apiErrorResponse(res, "User not found", null, HTTP_STATUS.NOT_FOUND);
        }
        // Check if the user is a curator
        const { followers, likes, shares, engagement, role } = user?.socialmedia;

        // If the role is brand, allow them to add the product without these checks
        if (user.role.name.toUpperCase() === 'BRAND') {
            return next();
        }

        // If the role is curator, validate their engagement numbers
        if (user.role.name.toUpperCase() === 'USER') {
            if(user.seller_approval)
            return next();
          
        }
         // Default response for unknown roles
         return apiErrorResponse(res, "Unauthorized user role", null, HTTP_STATUS.FORBIDDEN);


        // next();

    } catch (error) {
        console.log(error)
        return apiErrorResponse(res, "An error occurred while validating curator status", error.message, HTTP_STATUS.FORBIDDEN);
    }
};

const checkApproval =async(req, res, next)=>{
    const userId = req.body.userId || req.params.userId; 
        const user = await User.findById(userId);
    if (user.followers < 10000) {
        console.log("Not enough followers");
        return apiErrorResponse(res, "Followers count must be above 10k to add a product", null, HTTP_STATUS.FORBIDDEN);
    }

    if (user.likes < 10000) {
        console.log("Not enough likes");
        return apiErrorResponse(res, "Likes count must be above 10k to add a product", null, HTTP_STATUS.FORBIDDEN);
    }

    if (user.shares < 10000) {
        console.log("Not enough shares");
        return apiErrorResponse(res, "Shares count must be above 10k to add a product", null, HTTP_STATUS.FORBIDDEN);
    }

    if (user.engagement < 10000) {
        console.log("Not enough engagement");
        return apiErrorResponse(res, "Engagement count must be above 10k to add a product", null, HTTP_STATUS.FORBIDDEN);
    }
    next();
}


module.exports = {
    hashPasswords,
    generateSlug,
    checkFollowers,
    checkApproval
};
