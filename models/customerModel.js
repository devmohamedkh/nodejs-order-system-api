const mongoose = require("mongoose");
const customerSchema = new mongoose.Schema(
  {
    // _id: mongoose.Schema.Types.ObjectId,
    firstName: {
      type: String,
      trim: true,
      required: true,
    },
    lastName: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    phone: {
      type: String,
    },
    resetPasswordLink: {
      data: String,
      default: "",
    },
    token: {
      data: String,
      default: "",
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Customer", customerSchema);
