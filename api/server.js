import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import contactRoute from "./contact.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// Ruta de contacto
app.use("/api", contactRoute);

app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
});
