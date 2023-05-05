import express from "express";
import {
  login,
  registerPatients,
  registerDoctors,
  forgetPassword,
  findoutToken,
  NewPassword,
  getPatients,
  registerNutri,
  profile,
  editUsers,
  editProfile,
  getSpecialists,
} from "../controllers/usersController.js";
import checkAuth from "../middleware/checkAuth.js";

const router = express.Router();

router.post("/patients", registerPatients);
router.post("/doctors", checkAuth, registerDoctors);
router.post("/nutri", checkAuth, registerNutri);
router.route("/profile").get(checkAuth, profile).put(checkAuth, editProfile);
router.post("/login", login);
router.post("/forget-password", forgetPassword);
router.route("/forget-password/:token").get(findoutToken).post(NewPassword);
router.get("/patients", checkAuth, getPatients);
router.get("/specialists", checkAuth, getSpecialists);
router.put("/:id", checkAuth, editUsers);

export default router;
