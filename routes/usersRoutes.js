import express from "express";
import {
  login,
  register,
  forgetPassword,
  findoutToken,
  NewPassword,
  getPatients
} from "../controllers/usersController.js";
import checkAuth from "../middleware/checkAuth.js";

const router = express.Router();

router.post("/", checkAuth, register);
router.post("/login", login);
router.post("/forget-password", forgetPassword);
router.route("/forget-password/:token").get(findoutToken).post(NewPassword);
router.get("/patients", getPatients);


export default router;
