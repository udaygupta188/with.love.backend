const yup = require('yup');

// Define the schema using Yup
const roleSchema = yup.object({
    name: yup.string().required('Name is required'),
});

module.exports = {
    roleSchema
}