import { emailDate, emailUpdateDate } from "../helpers/emails.js";
import DateModel from "../models/Dates.js";
import User from "../models/Users.js";
import mongoose from "mongoose";

const createDate = async (req, res) => {
  const { idpatient, idespecialist } = req.body;

  try {
    const existPatient = await User.find({
      _id: idpatient,
      isPatient: true,
    });
    const existEspecialist = await User.find({
      _id: idespecialist,
      $or: [{ isPychologist: true }, { isNutri: true }, { isDoctor: true }],
    });

    if (!existPatient[0]) {
      const error = new Error("Paciente no registrado");
      return res.status(400).json({ msg: error.message, status: false });
    }

    if (!existEspecialist[0]) {
      const error = new Error("Especialista no registrado");
      return res.status(400).json({ msg: error.message, status: false });
    }

    const date = new DateModel(req.body);
    await date.save();

    existPatient[0].dates.push(date._id);
    await existPatient[0].save();

    existEspecialist[0].dates.push(date._id);
    existEspecialist[0].patients.push(idpatient);
    await existEspecialist[0].save();

    emailDate({
      firstname: existPatient[0].firstname,
      email: existPatient[0].email,
      especialistemail: existEspecialist[0].email,
    });

    res.status(200).json({ msg: "Cita agendada correctamente", status: true });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ msg: error.message, status: false });
  }
};

//Puede que no se use
const getDatesByEspecialist = async (req, res) => {
  const { id } = req.params;
  try {
    const dates = await DateModel.find({
      idespecialist: new mongoose.Types.ObjectId(id),
    }).populate("record");
    res.status(200).json({ data: dates, status: true });
  } catch (error) {
    res.status(400).json({ msg: error.message, status: false });
  }
};

const editDates = async (req, res) => {
  const { id } = req.params;
  const { user } = req;
  try {
    const date = await DateModel.findById(id);

    if (!date) {
      const error = new Error("Cita no encontrada");
      return res.status(401).json({ msg: error.message });
    }

    if (
      date.idpatient.toString() == user._id.toString() ||
      date.idespecialist.toString() == user._id.toString()
    ) {
      date.day = req.body.day || date.day;
      date.start = req.body.start || date.start;
      date.end = req.body.end || date.end;
      date.comments = req.body.comments || date.comments;
      date.recipe = req.body.recipe || date.recipe;
      date.callUrl = req.body.callUrl || date.callUrl;
      date.callId = req.body.callId || date.callId;
      const datestored = await date.save();

      const existPatient = await User.find({
        _id: date.idpatient,
        isPatient: true,
      });
      const existEspecialist = await User.find({
        _id: date.idespecialist,
        $or: [{ isPychologist: true }, { isNutri: true }, { isDoctor: true }],
      });

      if (!existPatient[0]) {
        const error = new Error("Paciente no registrado");
        return res.status(400).json({ msg: error.message, status: false });
      }

      if (!existEspecialist[0]) {
        const error = new Error("Especialista no registrado");
        return res.status(400).json({ msg: error.message, status: false });
      }

      emailUpdateDate({
        firstname: existPatient[0].firstname,
        email: existPatient[0].email,
        especialistemail: existEspecialist[0].email,
      });

      res.status(200).json({ msg: datestored, status: true });
    } else {
      const error = new Error("Usuario no autorizado para esta accion");
      return res.status(400).json({ msg: error.message, status: false });
    }
  } catch (error) {
    res.status(404).json({ msg: "El id que ingresaste no es valido" });
  }
};

const getDatesRecent = async (req, res) => {
  const { user } = req;

  if (!user.isDoctor) {
    const error = new Error("Usuario no autorizado para esta accion");
    return res.status(400).json({ msg: error.message, status: false });
  }

  try {
    const dates = await DateModel.find();

    dates.sort((date1, date2) => date2.updatedAt - date1.updatedAt);

    res.status(200).json({ data: dates, status: true });
  } catch (error) {
    res.status(400).json({ msg: error.message, status: false });
  }
};

const getDatesByPatient = async (req, res) => {
  const { id } = req.params;
  const fp = req.query.fp;
  try {
    if (!fp) {
      const dates = await DateModel.find({
        idpatient: new mongoose.Types.ObjectId(id),
      }).populate("record");

      res.status(200).json({ data: dates, status: true });
    } else {
      const dates = await DateModel.find({
        idpatient: new mongoose.Types.ObjectId(id),
      })
        .populate("record")
        .populate("idespecialist");
      res.status(200).json({ data: dates, status: true });
    }
  } catch (error) {
    res.status(400).json({ msg: error.message, status: false });
  }
};

const deleteDate = async (req, res) => {
  const { id } = req.params;
  try {
    const date = await DateModel.findById(id);

    if (!date) {
      const error = new Error("Cita no encontrada");
      return res.status(401).json({ msg: error.message });
    }

    await DateModel.deleteOne({ _id: id });
    res.status(200).json({ msg: "Cita eliminada exitosamente", status: true });
  } catch (error) {
    res.status(400).json({ msg: error.message, status: false });
  }
};

const getLastMeasuresBy = async (req, res) => {
  const { id } = req.params;
  try {
    const dates = await DateModel.find({
      idpatient: new mongoose.Types.ObjectId(id),
    }).populate("record");

    let response = false;
    const datesWithRecord = dates.filter((date) => "record" in date);
    console.log("CAMBIO!");

    if (datesWithRecord.length > 0) {
      const datesWithFilledRecord = datesWithRecord.filter(
        (date) => date.record !== undefined
      );
      if (datesWithFilledRecord.length > 0) {
        const datesWithNutriInfo = datesWithFilledRecord.filter(
          (date) => "nutriInfo" in date.record
        );

        if (datesWithNutriInfo.length > 0) {
          // Paso 1: Parsea las fechas a objetos Date
          datesWithNutriInfo.forEach((objeto) => {
            objeto.start = new Date(objeto.start);
          });

          // Paso 2: Ordena el arreglo en orden descendente según la propiedad "start"
          datesWithNutriInfo.sort((a, b) => b.start - a.start);

          // Paso 3: Accede al primer elemento del arreglo, que será el registro más actual
          const registroMasActual = datesWithNutriInfo[0].record.nutriInfo;

          if (registroMasActual) {
            const {
              neckMeasurement,
              armsMeasurement,
              backMeasurement,
              waistMeasurement,
              hipMeasurement,
              legsMeasurement,
            } = registroMasActual;
            response = {
              neckMeasurement,
              armsMeasurement,
              backMeasurement,
              waistMeasurement,
              hipMeasurement,
              legsMeasurement,
            };
          }
        }
      }
    }
    res.status(200).json({ data: response, status: true });
  } catch (error) {
    res.status(400).json({ msg: error.message, status: false });
  }
};

const getDateById = async (req, res) => {
  const { id } = req.params;
  try {
    const dateExist = await DateModel.findById(id);
    if (!dateExist) {
      const error = new Error("Cita no encontrado");
      return res.status(401).json({ msg: error.message });
    }
    /*
    const dates = await DateModel.find({
      _id: new mongoose.Types.ObjectId(id),
    }).populate("record");
    */
    res.status(200).json({ data: dateExist, status: true });
  } catch (error) {
    res.status(400).json({ msg: error.message, status: false });
  }
};

const storeCall = async (req, res) => {
  console.log("haz algo !!!");
  // Recibe y procesa la notificación del webhook
  //const videoData = req.body; // Supongamos que Video SDK envía datos en formato JSON
  //console.log('videoData', videoData)
  // Guarda el video o realiza acciones adicionales según tus necesidades
  // Ejemplo: guardar el video en el servidor
  // ...

  // Devuelve una respuesta al webhook
  res
    .status(200)
    .json({ msg: "Notificación del webhook recibida y procesada con éxito." });
};

export {
  createDate,
  getDatesByEspecialist,
  getDatesByPatient,
  editDates,
  getDatesRecent,
  deleteDate,
  getLastMeasuresBy,
  storeCall,
  getDateById
};
