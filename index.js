
import express from "express";
import conectarDB from "./config/bd.js";
import admin from 'firebase-admin';
import serviceAccount from './fconfig.json' assert { type: 'json' };

import dotenv from "dotenv";
import userRoutes from "./routes/usersRoutes.js";
import recordRoutes from "./routes/recordsRoutes.js";
import datesRoutes from "./routes/datesRoutes.js";
import frequentQuestionsRoutes from "./routes/frequentQuestionsRoutes.js";
import agoraRoutes from "./routes/agoraRoutes.js";
import notifRoutes from "./routes/notifRoutes.js";

import cors from "cors";
import bodyParser from "body-parser";
import multer from "multer";

dotenv.config();
const upload = multer(); // config
const app = express();
app.use(express.json());
app.use(upload.any());


/*FIREBASE*/

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

/*END FIREBASE*/




conectarDB();

const whitelist = [process.env.FRONTEND_URL, process.env.FRONTEND_URL_LOCAL];

const corsOptions = {
  origin: function (origin, callback) {
    callback(null, true);

  },
};

app.use(cors(corsOptions));

app.use("/api/users", userRoutes);
app.use("/api/records", recordRoutes);
app.use("/api/dates", datesRoutes);
app.use("/api/frequentQuestions", frequentQuestionsRoutes);
app.use("/api/agora", agoraRoutes);
app.use("/api/notif", notifRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
