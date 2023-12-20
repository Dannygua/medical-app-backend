import express from "express";
import checkAuth from "../middleware/checkAuth.js";
import { createAvatar } from "../controllers/meshController.js";

const router = express.Router();

router.post("/", createAvatar);

export default router;
