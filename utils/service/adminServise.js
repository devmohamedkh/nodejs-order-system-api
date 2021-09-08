const Admin = require("../../models/adminModel");
const bcrypt = require("bcryptjs");

exports.addAdmin = async (data) => {
  const newAdmin = await createAdminObj(data);
  return await Admin.create(newAdmin);
};
exports.getAdminByEmail = async (email) => {
  return await Admin.findOne({ email });
};
exports.getAdminByEmailWithPassword = async (email) => {
  return await Admin.findOne({ email }).select("+password");
};
exports.getAdminById = async (_id) => {
  return await Admin.findById(_id);
};
exports.getAllAdmins = async () => {
  return await Admin.find({});
};
exports.updateAdminById = async (_id, data) => {
  return await Admin.findByIdAndUpdate(_id, { $set: data }, { new: true });
};
exports.RemoveAdminById = async (_id) => {
  return await Admin.findByIdAndRemove(_id);
};

const createAdminObj = async (req) => {
  return {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 10),
    phone: req.body.phone,
  };
};
