const restaurantServise = require("../utils/service/restaurantServise");
const {
  errorResponse,
  successResponse,
} = require("../utils/helpers/responsHelper");

exports.updateRestaurant = async (req, res) => {
  try {
    const RestaurantExist = await restaurantServise.getRestaurantById(
      req.params.id
    );

    if (!RestaurantExist)
      return res.status(404).json(errorResponse("Restaurant not found", 404));

    if (RestaurantExist._id != req.restaurantId && !req.admin)
      return res
        .status(401)
        .json(
          errorResponse("you dont have promithon to update the Restaurant", 401)
        );
    const updatedRestaurant = await restaurantServise.updateRestaurantById(
      req.params.id,
      req.body
    );

    if (!updatedRestaurant)
      return res
        .status(400)
        .json(errorResponse("Could not update Restaurant", 404));

    return res
      .status(200)
      .json(
        successResponse(
          updatedRestaurant,
          "Restaurant updated Successfully!",
          201
        )
      );
  } catch (error) {
    return res
      .status(400)
      .json(errorResponse("Could not update Restaurant", 404));
  }
};

exports.getAllRestaurants = async (req, res) => {
  try {
    const Restaurants = await restaurantServise.getAllRestaurants();
    return res
      .status(200)
      .json(successResponse(Restaurants, "get Restaurant Successfully!", 201));
  } catch (error) {
    return res
      .status(400)
      .json(errorResponse("Could not get Restaurants ", 400));
  }
};

exports.getRestaurantById = async (req, res) => {
  try {
    const RestaurantExist = await restaurantServise.getRestaurantById(
      req.params.id
    );

    if (!RestaurantExist)
      return res.status(404).json(errorResponse("Restaurant not found", 404));

    return res
      .status(200)
      .json(
        successResponse(RestaurantExist, "get Restaurant Successfully!", 201)
      );
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json(errorResponse("Could not get Restaurants ", 400));
  }
};

exports.deleteRestaurantById = async (req, res) => {
  try {
    const RestaurantExist = await restaurantServise.getRestaurantById(
      req.params.id
    );

    if (!RestaurantExist)
      return res.status(404).json(errorResponse("Restaurant not found", 404));

    if (RestaurantExist._id != req.restaurantId && !req.admin)
      return res
        .status(401)
        .json(
          errorResponse("you dont have promithon to delete the Restaurant", 401)
        );

    const deletedRestaurant = await restaurantServise.RemoveRestaurantById(
      req.params.id
    );

    if (!deletedRestaurant)
      return res.status(404).json(errorResponse("Restaurant not deleted", 404));

    return res
      .status(200)
      .json(
        successResponse(RestaurantExist, "delete Restaurant Successfully!", 201)
      );
  } catch (error) {
    return res
      .status(400)
      .json(errorResponse("Could not delete Restaurants ", 400));
  }
};
