const mongoose = require("mongoose");
const validator = require("validator");

const salonSchema = new mongoose.Schema({
  serviceName: {
    type: String,
    required: [true, "Enter the service's name"],
    trim: true,
    maxlength: [40, "Service name cannot exceed 40 characters"],
    minlenght: [5, "Service name must be more than 5 characters"],
  },
  category: {
    type: String,
  },
  date: {
    type: String,
  },
  price: {
    type: Number,
  },
  rating: {
    type: Number,
    default: 0,
  },
  registeredUsers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }]
});

const Service = mongoose.model("Service", salonSchema);

module.exports = Service;
