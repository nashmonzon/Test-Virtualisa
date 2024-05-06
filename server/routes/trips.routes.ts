import express from "express";

const tripsController = require("../controllers/trips.controller");

const router = express.Router();

router.get("/", tripsController.getTrips);
router.post("/", tripsController.createTrip);

module.exports = router;
