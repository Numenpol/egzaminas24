const express = require("express");
const salonController = require("../controllers/salonController");
const authController = require("../controllers/authController");

const { getAllServices, getService, createService, updateService, deleteService, updateServiceRegisteredUsers, unregisterFromService, getAllRegisteredServices} = salonController;
const { protect, restrictTo } = authController;

const router = express.Router();

router.route("/").get(getAllServices).post(protect, restrictTo("admin"), createService);
router
    .route("/:id") 
    .get(getService)
    .patch(protect, restrictTo("user", "admin"), updateService)
    .delete(protect, restrictTo("admin"), deleteService);
    
router.route("/registeredservices/:id").get(getAllRegisteredServices);   


router.route("/serviceregister/:id").patch(protect, updateServiceRegisteredUsers).delete(protect, unregisterFromService);

module.exports = router;