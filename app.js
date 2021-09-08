const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require("./utils/helpers/db");
require("dotenv").config();
const app = express();

const authRoute = require("./routes/authRoute");
const customerRoute = require("./routes/customerRoute");
const restaurantRoute = require("./routes/restaurantRoute");
const productRoute = require("./routes/productRoute");
const categoryRoute = require("./routes/categoryRoute");
const cartRoute = require("./routes/cartRoute");
const orderRoute = require("./routes/orderRoute");
const checkoutRoute = require("./routes/checkoutRoute");

const { verifAdminJWT } = require("./utils/helpers/jwt");

//=====================
// MIDDLEWARE
//=====================
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(cookieParser());

// admin midllwer
app.use(function adminMid(req, res, next) {
  const token = req.header("admin-token");
  if (!token) return next();
  try {
    const verifiedAdmin = verifAdminJWT(token);
    req.admin = verifiedAdmin;
    next();
  } catch (err) {
    console.log(err);
    return next();
  }
});

//=====================
// ROUTES
//=====================
app.use("/api/auth", authRoute);
app.use("/api/customer", customerRoute);
app.use("/api/restaurant", restaurantRoute);
app.use("/api/product", productRoute);
app.use("/api/category", categoryRoute);
app.use("/api/cart", cartRoute);
app.use("/api/checkout", checkoutRoute);
app.use("/api/order", orderRoute);

connectDB();
app.listen(process.env.PORT, () =>
  console.log(`Example app listening on port port!`)
);
