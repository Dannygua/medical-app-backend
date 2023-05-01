import express from "express";
import {
  login,
  register,
  forgetPassword,
  findoutToken,
  NewPassword,
} from "../controllers/usersController.js";

const router = express.Router();

router.post("/", register);
router.post("/login", login);
router.post("/forget-password", forgetPassword);
router.route("/forget-password/:token").get(findoutToken).post(NewPassword);

export default router;
