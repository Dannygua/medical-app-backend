import express from "express";
import conectarDB from "./config/bd.js";
import dotenv from "dotenv";
import userRoutes from "./routes/usersRoutes.js";
import recordRoutes from "./routes/recordsRoutes.js";
import datesRoutes from "./routes/datesRoutes.js";
import frequentQuestionsRoutes from "./routes/frequentQuestionsRoutes.js";
import agoraRoutes from "./routes/agoraRoutes.js";
import cors from "cors";
import bodyParser from "body-parser";
import multer from "multer";

dotenv.config();
const upload = multer(); // config
const app = express();
app.use(express.json());
app.use(upload.any());


/*FIREBASE*/
/*
const admin = require('firebase-admin');
admin.initializeApp({
  credential: admin.credential.cert({
    apiKey: "AIzaSyDW41Pbip5XUyqnL0g89Zj7RCGXQGCkv5s",
    authDomain: "bypassgastricoec.firebaseapp.com",
    projectId: "bypassgastricoec",
    storageBucket: "bypassgastricoec.appspot.com",
    messagingSenderId: "1083213293687",
    appId: "1:1083213293687:web:d28045cc873ef5c9fa3e72",
    measurementId: "G-ZD7BYP9LN6"
  }),
});
*/
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

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
