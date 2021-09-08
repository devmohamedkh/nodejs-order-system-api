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
| Route  | methode | header | body | desc  |
| :----: |  :---:  | :-----:| :---:|:-----:|
| /signup |  POST |    _    |  _   |  to create a customer |
| /login |  POST |    _    |  _   |  to login as customer |
| /admin/signup |  POST |    _    |  _   |  to create a admin |
| /admin/login |  POST |    _    |  _   |  to login as admin |
| /restaurant/signup |  POST |    _    |  _   |  to create a restaurant |
| /restaurant/login |  POST |    _    |  _   |  to login as restaurant |






 what user can do:
* creat and update or delete account.
* add oroduct to cart and remove it or updete.
* create order and  update or delete the order.

user roue:
| Route  | methode  | header | body |
| :------------: |:---------------:| :-----:| :-----:|
| col 3 is      | some wordy text | $1600 |       |
| col 2 is      | centered        |   $12 |
| zebra stripes | are neat        |    $1 |

