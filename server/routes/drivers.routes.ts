import express from "express";

const driversController = require("../controllers/drivers.controller");

const router = express.Router();

router.get("/", driversController.getDrivers);
router.get("/driver-vehicles", driversController.getDriversWithVehicles);
router.get("/:id", driversController.getDriver);
router.post("/", driversController.createDriver);
router.delete("/", driversController.deleteAllDriver);
router.post("/assign", driversController.assignVehicleToDriver);

module.exports = router;
