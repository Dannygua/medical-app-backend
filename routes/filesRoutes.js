import express from "express";
import { upload } from "../controllers/filesController.js";
/*import multer from "multer";



const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads'); // Carpeta donde se guardarán los archivos temporalmente en el servidor
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    }
  });
  
const uploadM = multer({ storage });
*/

const router = express.Router();

router.post("/upload", upload);

export default router;
