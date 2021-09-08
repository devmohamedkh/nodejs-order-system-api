const Restaurant = require("../../models/restaurantModel");
const bcrypt = require("bcryptjs");

exports.addRestaurant = async (data) => {
  const newRestaurant = await createRestaurantObj(data);
  return await Restaurant.create(newRestaurant);
};
exports.getRestaurantByEmail = async (email) => {
  return await Restaurant.findOne({ email });
};
exports.getRestaurantByEmailWithPassword = async (email) => {
  return await Restaurant.findOne({ email }).select("+password");
};
exports.getRestaurantById = async (_id) => {
  return await Restaurant.findById(_id);
};
exports.getAllRestaurants = async () => {
  return await Restaurant.find({});
};
exports.updateRestaurantById = async (_id, data) => {
  return await Restaurant.findByIdAndUpdate(_id, { $set: data }, { new: true });
};
exports.RemoveRestaurantById = async (_id) => {
  return await Restaurant.findByIdAndRemove(_id);
};

const createRestaurantObj = async (req) => {
  return {
    name: req.body.name,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 10),
    phone: req.body.phone,
  };
};
