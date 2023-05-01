import express from "express";
import { autenticar, registrar } from "../controllers/usuarioController.js";

const router = express.Router();

router.post("/", registrar);
router.post("/login", autenticar);

export default router;
