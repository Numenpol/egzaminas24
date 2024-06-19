const Service = require("../models/salonModel");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

exports.getAllServices = async (req, res) => {
  try {
    const servicesCreated = await Service.find();
    res.status(200).json({
      status: "success",
      results: servicesCreated.length,
      data: {
        services: servicesCreated,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error.message,
    });
  }
};

exports.getAllRegisteredServices = async (req, res) => {
  try {
    const userId = req.params.id;
    servicesCreated = await Service.find({ registeredUsers: userId });
    res.status(200).json({
      status: "success",
      results: servicesCreated.length,
      data: {
        services: servicesCreated,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error.message,
    });
  }
};

exports.getService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id).populate("registeredUsers");
    if (!service) {
      return res.status(404).json({
        status: "fail",
        message: "Service not found",
      });
    }
    res.status(200).json({
      status: "success",
      data: {
        service,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error.message,
    });
  }
};

exports.createService = async (req, res) => {
  try {
    const service = await Service.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        service,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

exports.updateService = async (req, res) => {
  try {
    const service = await Service.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: "success",
      data: {
        service,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error.message,
    });
  }
};

exports.deleteService = async (req, res) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);
    if (!service) {
      return res.status(404).json({
        status: "fail",
        message: "Service not found",
      });
    }
    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error.message,
    });
  }
};

exports.updateServiceRegisteredUsers = async (req, res) => {
  try {
    const { id } = req.params;
    const service = await Service.findById(id);

    const token = req.headers.authorization.replace('Bearer ', '');
    // Decode the JWT to extract the user's ID
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    const user = await User.findById(userId);

    if (!service || !user) {
      return res.status(404).json({
        status: "fail",
        message: "Service or user not found",
      });
    }

    // Check if the user is already registered for this service
    if (service.registeredUsers.includes(userId)) {
      return res.status(400).json({
        status: "fail",
        message: "User is already registered for this service",
      });
    }

    // Update the service's registeredUsers field
    service.registeredUsers.push(userId);
    await Service.updateOne({ _id: service._id }, { registeredUsers: service.registeredUsers });

    // Update the user's registeredTrips field
    user.registeredServices.push(id);
    await User.updateOne({ _id: user._id }, { registeredTrips: user.registeredServices });

    res.status(200).json({
      status: "success",
      data: {
        service,
        user,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

exports.unregisterFromService = async (req, res) => {
  try {
    const { id } = req.params;

    const token = req.headers.authorization.replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    const service = await Service.findById(id);

    const user = await User.findById(userId);

    if (!service || !user) {
      return res.status(404).json({
        status: "fail",
        message: "Service or user not found",
      });
    }

    // Check if the user is registered for the service
    if (!service.registeredUsers.includes(userId)) {
      return res.status(400).json({
        status: "fail",
        message: "User is not registered for this service",
      });
    }

    // Remove the user's ID from the service's registeredUsers array
    const index = service.registeredUsers.indexOf(userId);
    service.registeredUsers.splice(index, 1);
    await Service.updateOne({ _id: service._id }, { registeredUsers: service.registeredUsers });

    // Remove the trip's ID from the user's registeredTrips array
    const serviceIndex = user.registeredServices.indexOf(id);
    user.registeredServices.splice(serviceIndex, 1);
    await User.updateOne({ _id: user._id }, { registeredServices: user.registeredServices });

    res.status(200).json({
      status: "success",
      message: "User unregistered from the service successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};
