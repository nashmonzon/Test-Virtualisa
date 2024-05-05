import express from "express";

const vehiclesController = require("../controllers/vehicles.controller");

const router = express.Router();

router.get("/", vehiclesController.getVehicles);
router.get("/:id", vehiclesController.getVehicle);
router.post("/", vehiclesController.createVehicle);
router.get("/without-driver/:id", vehiclesController.getVehiclesWithoutDriver);

// router.delete("/", vehiclesController.deleteAllDriver);

module.exports = router;
