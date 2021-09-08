# nodejs-order-system-api

# Introduction
order system api using Node js, Express js, and Mongoose.
The system relies on restaurants to create products and customers with a admin to manage customer technical problems
and delete and modify data for both restaurants and customers

# Technology
* Node.js
* MongoDB 
* Express 
* joi
* jsonwebtoken
* multer
* stripe

# Features
* Create an account as customer or seller and admin, login or logout
* Browse available products
*  add - delete - update  product
* Add products to the shopping cart
* Delete or update products from the shopping cart
* Display the shopping cart
* Browse orders and create or delete

# routs
## auth Roue
| Route  | methode | desc  |
| :---- | :---:|:-----|
| /signup |  POST |  to create a customer |
| /login |  POST |  to login as customer |
| /admin/signup |  POST |  to create a admin |
| /admin/login |  POST | to login as admin |
| /restaurant/signup |  POST |  to create a restaurant |
| /restaurant/login |  POST |to login as restaurant |



## user roue:
| Route  | methode | desc  |
| :---- |  :---:  |:-----|
| /customer |  GET |  to get all customers |
| /customer/:id |  GET | to get customer by id |
| /admin/signup |  POST |  to create a admin |
| /admin/login |  POST |  to login as admin |
| /restaurant/signup |  POST | to create a restaurant |
| /restaurant/login |  POST | to login as restaurant |



