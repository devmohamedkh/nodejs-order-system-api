const Customer = require("../../models/customerModel");
const bcrypt = require("bcryptjs");

exports.addCustomer = async (data) => {
  const newCustomer = await createCustomerObj(data);
  return await Customer.create(newCustomer);
};
exports.getCustomerByEmail = async (email) => {
  return await Customer.findOne({ email });
};
exports.getCustomerByEmailWithPassword = async (email) => {
  return await Customer.findOne({ email }).select("+password");
};
exports.getCustomerById = async (_id) => {
  return await Customer.findById(_id);
};
exports.getAllCustomers = async () => {
  return await Customer.find({});
};
exports.updateCustomerById = async (_id, data) => {
  return await Customer.findByIdAndUpdate(_id, { $set: data }, { new: true });
};
exports.RemoveCustomerById = async (_id) => {
  return await Customer.findByIdAndRemove(_id);
};

const createCustomerObj = async (req) => {
  return {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 10),
    phone: req.body.phone,
  };
};
