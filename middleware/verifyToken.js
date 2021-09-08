const {
  verifyJWT,
  verifAdminJWT,
  verifRestaurantJWT,
} = require("../utils/helpers/jwt");
const { errorResponse } = require("../utils/helpers/responsHelper");

const isAuth = (req, res, next) => {
  try {
    const token = req.header("auth-token");
    if (!token)
      return res.status(400).json(errorResponse("user not authenticated", 400));
    const verifiedUser = verifyJWT(token);
    req.user = verifiedUser;
    next();
  } catch (err) {
    return res.status(400).json(errorResponse("user not authenticated", 400));
  }
};

const verifyCustomer = (req, res, next) => {
  try {
    const token = req.header("auth-token");
    if (!token && !req.admin)
      return res.status(400).json(errorResponse("access denied", 401));

    if (token) {
      const verifiedCustomer = verifyJWT(token);
      req.customerId = verifiedCustomer;
    }
    next();
  } catch (err) {
    return res.status(400).json(errorResponse("invalid token", 401));
  }
};

const verifyAdmin = (req, res, next) => {
  const token = req.header("admin-token");
  if (!token) return res.status(400).json(errorResponse("access denied", 401));

  try {
    if (token) {
      const verifiedAdmin = verifAdminJWT(token);
      req.admin = verifiedAdmin;
    }

    next();
  } catch (err) {
    console.log(err);
    res.status(400).json(errorResponse("invalid token", 401));
  }
};

const verifyRestaurant = (req, res, next) => {
  const token = req.header("restaurant-token");
  if (!token && !req.admin)
    return res.status(400).json(errorResponse("access denied", 401));

  try {
    if (token) {
      const verifiedAdmin = verifRestaurantJWT(token);
      req.restaurantId = verifiedAdmin;
    }
    next();
  } catch (err) {
    res.status(400).json(errorResponse("invalid token", 401));
  }
};

module.exports = { verifyCustomer, verifyAdmin, isAuth, verifyRestaurant };
