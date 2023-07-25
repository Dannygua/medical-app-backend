import express from "express";
import { sendNotif } from "../controllers/notifController.js";

const router = express.Router();

router.post("/", sendNotif);

export default router;