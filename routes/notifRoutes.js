import express from "express";
import checkAuth from "../middleware/checkAuth.js";
import { createNotification, notificationsByReceiver } from "../controllers/notifController.js";

const router = express.Router();

router.post("/", checkAuth, createNotification);
router.get("/byReceiver/:receiverId", checkAuth, notificationsByReceiver);

export default router;
