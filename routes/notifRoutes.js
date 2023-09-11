import express from "express";
import checkAuth from "../middleware/checkAuth.js";
import { createNotification, notificationsByReceiver } from "../controllers/notifController";

const router = express.Router();

router.post("/", checkAuth, createNotification);
router.get("/byReceiver/:receiverId", checkAuth, notificationsByReceiver);

export default router;
