const SubRole = require("./subRole.model");

const message = {
    createSubRole: "Sub Role created successfully!",
    updateSubRole: "Sub Role updated successfully!",
    getAllSubRoles: "Sub Role read successfully!",
    getSubRoleById: "Sub Role read successfully",
    deleteSubRole: "Sub Role deleted succssfully!"
}

const createSubRole = async (requestData) => {
    const subRole = new SubRole(requestData)
    await subRole.save();
    return {
        subRole,
        message: message.createSubRole
    }
}

const getSubRoles = async (roleId) => {
    const subRoles = await SubRole.find({ roleId: roleId })
    return {
        subRoles,
        message: message.getAllSubRoles
    }
}

module.exports = {
    createSubRole,
    getSubRoles
}