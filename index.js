import express from "express";
import conectarDB from "./config/bd.js";
import dotenv from "dotenv";
import userRoutes from "./routes/usersRoutes.js";
import recordRoutes from "./routes/recordsRoutes.js";
import datesRoutes from "./routes/datesRoutes.js";
import frequentQuestionsRoutes from "./routes/frequentQuestionsRoutes.js";
import cors from "cors";
import bodyParser from "body-parser";
import multer from "multer";

dotenv.config();
const upload = multer(); // config
const app = express();
app.use(express.json());
app.use(upload.any());

conectarDB();

// const whitelist = [process.env.FRONTEND_URL, process.env.FRONTEND_URL_LOCAL];

// const corsOptions = {
//   origin: function (origin, callback) {
//     if (whitelist.includes(origin)) {
//       callback(null, true);
//     } else {
//       callback(new Error("Error de Cors"));
//     }
//   },
// };

// app.use(cors(corsOptions));

app.use("/api/users", userRoutes);
app.use("/api/records", recordRoutes);
app.use("/api/dates", datesRoutes);
app.use("/api/frequentQuestions", frequentQuestionsRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
