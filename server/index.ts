import express from "express";
import cors from "cors";

const driversRoutes = require("./routes/drivers.routes");
const vehiclesRoutes = require("./routes/vehicles.routes");
const tripsRoutes = require("./routes/trips.routes");
const priceRoutes = require("./routes/price.routes");

const app = express();
app.use(cors());
app.use(express.json());
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

app.use("/drivers", driversRoutes);
app.use("/vehicles", vehiclesRoutes);
app.use("/trips", tripsRoutes);
app.use("/price", priceRoutes);

const PORT = process.env.PORT || 4000;

app.listen(Number(PORT), "0.0.0.0", 500, () => {
  console.log(`esta en el puerto ${PORT}`);
});
