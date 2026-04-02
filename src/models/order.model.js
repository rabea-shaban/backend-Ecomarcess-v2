const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

    items: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        name: String,
        price: Number,
        quantity: Number,
        image: String,
      },
    ],

    billing: {
      firstName: { type: String, required: true },
      companyName: String,
      streetAddress: { type: String, required: true },
      apartment: String,
      city: { type: String, required: true },
      phone: { type: String, required: true },
      email: { type: String, required: true },
    },

    paymentMethod: {
      type: String,
      enum: ["bank", "cash"],
      default: "cash",
    },

    total: { type: Number, required: true },

    status: {
      type: String,
      enum: ["pending", "processing", "delivered", "cancelled"],
      default: "pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
