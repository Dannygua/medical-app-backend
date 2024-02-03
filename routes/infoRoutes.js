import express from "express";
import checkAuth from "../middleware/checkAuth.js";
import { contactInfoByPatient, generalInfoByPatient } from "../controllers/infoController.js";

const router = express.Router();

router.get("/generalInfo/:patientId", checkAuth, generalInfoByPatient);
router.get("/contactInfo/:patientId", checkAuth, contactInfoByPatient);

export default router;
