const Role = require("../models/admin/roleModel")

const message = {
    createRole: "Role created successfully!",
    updateRole: "Role updated successfully!",
    getAllRoles: "Role read successfully!",
    getRoleById: "Role read successfully",
    deleteRole: "Role deleted succssfully!"
}

const createRole = async (requestData) => {
    const role = new Role(requestData)
    await role.save();
    return {
        role,
        message: message.createRole
    }
}
const updateRole = async (roleId, requestData) => {
    const { name } = requestData;
    if (!roleId) {
        throw Error("Role id required");
    }
    console.log("first")
    const role = await Role.findOneAndUpdate({ _id: roleId }, { name }, { new: true });
    console.log("first")
    return {
        role,
        message: message.updateRole
    }
}
const getAllRoles = async (requestData) => {
    const { limit = 10, page = 1 } = requestData;
    const skip = (page - 1) * limit;
    const roles = await Role.find().skip(skip).limit(limit).exec();
    const totalCount = await Role.countDocuments().exec();
    return {
        roles,
        totalCount,
        totalPages: Math.ceil(totalCount / limit),
        currentPage: page,
        message: message.getAllRoles
    }
}
const getRoleById = async (id) => {
    const role = await Role.findById(id);
    if (!role) {
        return {
            role: {},
            message: "No Role found"
        }
    }
    return { role, message: message.getRoleById }
}
const deleteRole = async (roleId) => {
    const role = await Role.findOneAndDelete({ _id: roleId })
    return {
        role,
        message: message.deleteRole
    }
}

module.exports = {
    createRole,
    updateRole,
    getAllRoles,
    getRoleById,
    deleteRole
}