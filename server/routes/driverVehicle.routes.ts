import express from "express";

const driverVehicleController = require("../controllers/driverVehicle.controller");

const router = express.Router();

router.post("/", driverVehicleController.assignVehicleToDriver);

module.exports = router;
