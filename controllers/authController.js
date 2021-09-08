const bcrypt = require("bcryptjs");

const customerServise = require("../utils/service/customerServise");
const restaurantServise = require("../utils/service/restaurantServise");
const adminServise = require("../utils/service/adminServise");
const {
  errorResponse,
  successResponse,
  loginSuccessResponse,
} = require("../utils/helpers/responsHelper");
const {
  registerValidation,
  loginValidation,
  restaurantRegisterValidation,
} = require("../middleware/validation");
const {
  creatJWT,
  creatAdminJWT,
  creatRestaurantJWT,
} = require("../utils/helpers/jwt");

exports.signUp = async (req, res) => {
  try {
    const { error, value } = registerValidation(req.body);
    if (error)
      return res.status(400).json(errorResponse(error.details[0].message, 400));
    // to chack emaile if Email already exist or not
    const emailExist = await customerServise.getCustomerByEmail(req.body.email);

    if (emailExist)
      return res.status(400).json(errorResponse("Email already exist!", 400));

    // creat user if is not exist
    const saveUserToDB = await customerServise.addCustomer(req);
    return res
      .status(201)
      .json(successResponse(saveUserToDB, "User created Successfully!", 201));
  } catch (error) {
    console.log(error);
    res.status(400).json(errorResponse("somting wos rong pless try agin", 400));
  }
};

exports.logIn = async (req, res) => {
  try {
    const { error, value } = loginValidation(req.body);
    console.log(error);
    if (error)
      return res.status(400).json(errorResponse(error.details[0].message, 400));
    // check if user is exist or not
    const foundUser = await customerServise.getCustomerByEmailWithPassword(
      req.body.email
    );
    console.log(req.body.email);
    console.log(foundUser);
    if (!foundUser)
      return res
        .status(400)
        .json(errorResponse("The email or password is incorrect", 400));
    // check is password correct or not
    const isMatch = bcrypt.compareSync(req.body.password, foundUser.password);
    if (!isMatch)
      return res
        .status(400)
        .json(errorResponse("The email or password is incorrect", 400));

    // create and assign jwt
    const token = creatJWT(foundUser._id);
    const userResponse = sendUserdata(foundUser);

    return res
      .status(200)
      .header("token", token)
      .json(loginSuccessResponse(userResponse, "login Successfully!", token));
  } catch (error) {
    console.log(error);
    res.status(400).json(errorResponse("somting wos rong pless try agin", 400));
  }
};

exports.logOut = async (req, res) => {
  return res
    .status(200)
    .header("auth-token", "")
    .json(successResponse("", "logOut Successfully!"));
};

// Admin
exports.signUpAdmin = async (req, res) => {
  try {
    const { error, value } = registerValidation(req.body);
    if (error)
      return res.status(400).json(errorResponse(error.details[0].message, 400));
    // to chack emaile if Email already exist or not
    const emailExist = await adminServise.getAdminByEmail(req.body.email);

    if (emailExist)
      return res.status(400).json(errorResponse("Email already exist!", 400));

    // creat admin if is not exist
    const saveUserToDB = await adminServise.addAdmin(req);
    return res
      .status(201)
      .json(successResponse(saveUserToDB, "Admin created Successfully!", 201));
  } catch (error) {
    console.log(error);
    res.status(400).json(errorResponse("somting wos rong pless try agin", 400));
  }
};

exports.logInAdmin = async (req, res) => {
  try {
    const { error, value } = loginValidation(req.body);
    console.log(error);
    if (error)
      return res.status(400).json(errorResponse(error.details[0].message, 400));
    // check if user is exist or not
    const foundUser = await adminServise.getAdminByEmailWithPassword(
      req.body.email
    );
    if (!foundUser)
      return res
        .status(400)
        .json(errorResponse("The email or password is incorrect", 400));
    // check is password correct or not
    const isMatch = bcrypt.compareSync(req.body.password, foundUser.password);
    if (!isMatch)
      return res
        .status(400)
        .json(errorResponse("The email or password is incorrect", 400));

    // create and assign jwt
    const token = creatAdminJWT(foundUser._id);
    const userResponse = sendUserdata(foundUser);

    return res
      .status(200)
      .header("admin-token", token)
      .json(loginSuccessResponse(userResponse, "login Successfully!", token));
  } catch (error) {
    console.log(error);
    res.status(400).json(errorResponse("somting wos rong pless try agin", 400));
  }
};

exports.logOutAdmin = async (req, res) => {
  return res
    .status(200)
    .header("admin-token", "")
    .json(successResponse("", "logOut Successfully!"));
};

// restaurant
exports.signUpRestaurant = async (req, res) => {
  try {
    const { error, value } = restaurantRegisterValidation(req.body);
    if (error)
      return res.status(400).json(errorResponse(error.details[0].message, 400));
    // to chack emaile if Email already exist or not
    const emailExist = await restaurantServise.getRestaurantByEmail(
      req.body.email
    );

    if (emailExist)
      return res.status(400).json(errorResponse("Email already exist!", 400));

    // creat user if is not exist
    const saveRestaurantToDB = await restaurantServise.addRestaurant(req);
    return res
      .status(201)
      .json(
        successResponse(
          saveRestaurantToDB,
          "Restaurant created Successfully!",
          201
        )
      );
  } catch (error) {
    console.log(error);
    res.status(400).json(errorResponse("somting wos rong pless try agin", 400));
  }
};

exports.logInRestaurant = async (req, res) => {
  try {
    const { error, value } = loginValidation(req.body);
    if (error)
      return res.status(400).json(errorResponse(error.details[0].message, 400));
    // check if user is exist or not
    const foundRestaurant =
      await restaurantServise.getRestaurantByEmailWithPassword(req.body.email);
    if (!foundRestaurant)
      return res
        .status(400)
        .json(errorResponse("The email or password is incorrect", 400));
    // check is password correct or not
    const isMatch = bcrypt.compareSync(
      req.body.password,
      foundRestaurant.password
    );
    if (!isMatch)
      return res
        .status(400)
        .json(errorResponse("The email or password is incorrect", 400));

    // create and assign jwt
    const token = creatRestaurantJWT(foundRestaurant._id);
    const restaurantResponse = sendRestaurantData(foundRestaurant);

    return res
      .status(200)
      .header("restaurant-token", token)
      .json(
        loginSuccessResponse(restaurantResponse, "login Successfully!", token)
      );
  } catch (error) {
    console.log(error);
    res.status(400).json(errorResponse("somting wos rong pless try agin", 400));
  }
};

exports.logOutRestaurant = async (req, res) => {
  return res
    .status(200)
    .header("restaurant-token", "")
    .json(successResponse("", "logOut Successfully!"));
};

// to ignor password in response
const sendUserdata = (userdata) => {
  return {
    _id: userdata._id,
    firstName: userdata.firstName,
    lastName: userdata.lastName,
    email: userdata.email,
    phone: userdata.phone,
  };
};
const sendRestaurantData = (data) => {
  return {
    _id: data._id,
    name: data.name,
    email: data.email,
    phone: data.phone,
  };
};
