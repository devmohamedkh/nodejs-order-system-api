const app = require("express").Router();
const customerController = require("../controllers/customerController");
const { verifyCustomer } = require("../middleware/verifyToken");

/*
    method => get 
    route  => api/customer/
    accses => all 
    desc   => to get customer profile
*/
app.get("/:id", customerController.getCustomerById);

/*
    method => patch 
    route  => api/customer/id
    accses => only user have the account  
    desc   => to updet customer profile
*/
app.patch("/:id", verifyCustomer, customerController.updateCustomer);

/*
    method => delete 
    route  => api/customer/id
    accses => only user have the account  
    desc   => to delete customer profile
*/
app.delete("/:id", verifyCustomer, customerController.deleteCustomerById);

module.exports = app;
