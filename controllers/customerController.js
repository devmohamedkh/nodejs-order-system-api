const customerServise = require("../utils/service/customerServise");
const {
  errorResponse,
  successResponse,
} = require("../utils/helpers/responsHelper");

exports.updateCustomer = async (req, res) => {
  try {
    const customerExist = await customerServise.getAllCustomers(req.params.id);

    if (!customerExist)
      return res.status(404).json(errorResponse("user not found", 404));

    if (customerExist._id != req.params.id && !req.admin)
      return res
        .status(401)
        .json(
          errorResponse("you dont have promithon to update the customer", 401)
        );
    const updatedCustomer = await customerServise.updateCustomerById(
      req.params.id,
      req.body
    );

    if (!updatedCustomer)
      return res
        .status(400)
        .json(errorResponse("Could not update customer", 404));

    return res
      .status(200)
      .json(
        successResponse(updatedCustomer, "customer updated Successfully!", 201)
      );
  } catch (error) {
    return res.status(400).json(errorResponse("Could not update user", 404));
  }
};

exports.getAllCustomers = async (req, res) => {
  try {
    const customers = await customerServise.getAllCustomers();
    return res
      .status(200)
      .json(successResponse(customers, "get customers Successfully!", 201));
  } catch (error) {
    return res.status(400).json(errorResponse("Could not get customers ", 400));
  }
};

exports.getCustomerById = async (req, res) => {
  try {
    const customerExist = await customerServise.getCustomerById(req.params.id);

    if (!customerExist)
      return res.status(404).json(errorResponse("customer not found", 404));

    return res
      .status(200)
      .json(successResponse(customerExist, "get customer Successfully!", 201));
  } catch (error) {
    console.log(error);
    return res.status(400).json(errorResponse("Could not get customer ", 400));
  }
};

exports.deleteCustomerById = async (req, res) => {
  try {
    const customerExist = await customerServise.getCustomerById(req.params.id);

    if (!customerExist)
      return res.status(404).json(errorResponse("customer not found", 404));

    if (customerExist._id != req.params.id && !req.admin)
      return res
        .status(401)
        .json(
          errorResponse("you dont have promithon to delete the customer", 401)
        );

    const deletedCustomer = await customerServise.RemoveCustomerById(
      req.params.id
    );

    if (!deletedCustomer)
      return res.status(404).json(errorResponse("customer not deleted", 404));

    return res
      .status(200)
      .json(
        successResponse(customerExist, "delete customer Successfully!", 201)
      );
  } catch (error) {
    return res
      .status(400)
      .json(errorResponse("Could not delete customer ", 400));
  }
};
