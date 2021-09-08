const app = require("express").Router();
const productController = require("../controllers/productController");
const { verifyRestaurant, isAuth } = require("../middleware/verifyToken");

/*
    method => get 
    route  => api/product/:id
    accses => all 
    desc   => to get all product
*/
app.get("/", productController.getAllProduct);
/*
    method => get 
    route  => api/product/
    accses => all 
    desc   => to product by id
*/
app.get("/:id", productController.getProductById);
/*
    method => post 
    route  => api/product/
    accses => all 
    desc   => to create product
*/
app.post("/", verifyRestaurant, productController.addProduct);

/*
    method => patch 
    route  => api/product/id
    accses => Only used product owner 
    desc   => to updet product
*/
app.patch("/:id", verifyRestaurant, productController.updateProduct);

/*
    method => delete 
    route  => api/product/id
    accses => Only used product owner
    desc   => to delete product
*/
app.delete("/:id", verifyRestaurant, productController.deleteProductById);

module.exports = app;
