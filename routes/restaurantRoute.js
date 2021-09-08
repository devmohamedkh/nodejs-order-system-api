const app = require("express").Router();
const restaurantController = require("../controllers/restaurantController");
const { verifyRestaurant } = require("../middleware/verifyToken");

/*
    method => get 
    route  => api/customer/:id
    accses => all 
    desc   => to get all customer
*/
app.get("/", restaurantController.getAllRestaurants);
/*
    method => get 
    route  => api/users/
    accses => all 
    desc   => to get all users
*/
app.get("/:id", restaurantController.getRestaurantById);

/*
    method => patch 
    route  => api/users/id
    accses => only user have the account  
    desc   => to updet a user 
*/
app.patch("/:id", verifyRestaurant, restaurantController.updateRestaurant);

/*
    method => delete 
    route  => api/users/id
    accses => only user have the account  
    desc   => to delete a user
*/
app.delete("/:id", verifyRestaurant, restaurantController.deleteRestaurantById);

module.exports = app;
