import express from "express";
import checkAuth from "../middleware/checkAuth.js";
import {
  createDate,
  getDatesByEspecialist,
  editDates,
  getDatesRecent,
  getDatesByPatient,
} from "../controllers/datesController.js";
import { makeQuestion } from "../controllers/chatbotController.js";

const router = express.Router();

router.post("/", checkAuth, createDate);
router.get("/byEspecialist/:id", checkAuth, getDatesByEspecialist);
router.put("/:id", checkAuth, editDates);
router.get("/datesrecent", checkAuth, getDatesRecent);
router.get("/byPatient/:id", checkAuth, getDatesByPatient);

router.post("/prueba", makeQuestion)

export default router;
