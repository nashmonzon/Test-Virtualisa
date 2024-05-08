import express from "express";

const priceController = require("../controllers/price.controller");

const router = express.Router();

router.get("/", priceController.getPrice);
router.get("/prices", priceController.getPrices);
router.get("/stats", priceController.gatStats);
router.post("/", priceController.createPrice);

module.exports = router;
