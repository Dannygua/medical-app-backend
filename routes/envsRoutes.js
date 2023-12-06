import express from "express";
import { getSimulationUrl } from "../controllers/envsController.js";

const router = express.Router();

router.post("/", getSimulationUrl);

export default router;