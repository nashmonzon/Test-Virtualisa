import express from "express";

const vehiclesController = require("../controllers/vehicles.controller");

const router = express.Router();

router.get("/", vehiclesController.getVehicles);
router.post("/", vehiclesController.createVehicle);
// router.delete("/", vehiclesController.deleteAllDriver);

module.exports = router;
