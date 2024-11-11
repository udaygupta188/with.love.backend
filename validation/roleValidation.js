const yup = require('yup');

// Define the schema using Yup
const roleSchema = yup.object({
    name: yup.string().required('Name is required'),
});

const subRoleSchema = yup.object({
    name:yup.string().required('Name is required'),
    roleId:yup.string().required('Role id is required')
})
module.exports = {
    roleSchema,
    subRoleSchema
}