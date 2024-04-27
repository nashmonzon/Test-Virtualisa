import express from "express";
import cors from "cors";
const app = express();

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 4000;

app.get("/ping", (_req, res) => {
  console.log("fom");
  res.send("pon");
});

app.listen(PORT, () => {
  console.log(`esta en el puerto ${PORT}`);
});
