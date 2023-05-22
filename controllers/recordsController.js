import DateModel from "../models/Dates.js";
import Record from "../models/MedicalRecords.js";
import User from "../models/Users.js";
import {
  DeleteUniqueImage,
  uploadImages,
  uploadMultipleImages,
} from "../utils/uploadImage.js";

const createRecord = async (req, res) => {
  const { idpatient, idespecialist, iddate, Test } = req.body;

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

    const existDate = await DateModel.find({
      _id: iddate,
    });

    if (!existDate[0]) {
      const error = new Error("Cita no registrada");
      return res.status(400).json({ msg: error.message, status: false });
    }

    const record = new Record(req.body);

    if (Test && Test[0].resultPhoto) {
      for (let i = 0; i < Test.length; i++) {
        let url = await uploadMultipleImages(Test[i].resultPhoto);

        record.Test[i].resultPhoto = [];
        url.map(async (file) => {
          record.Test[i].resultPhoto.push(file.file);
        });
      }
    }

    await record.save();

    existDate[0].record = record._id;
    await existDate[0].save();

    res
      .status(200)
      .json({ msg: "Registro Medico creado Correctamente", status: true });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ msg: error.message, status: false });
  }
};

const editRecords = async (req, res) => {
  const { id } = req.params;
  const { user } = req;
  const { Test } = req.body;
  try {
    const record = await Record.findById(id);

    if (!record) {
      const error = new Error("Registro medico no encontrado");
      return res.status(401).json({ msg: error.message });
    }

    if (record.Test && record.Test.length > 0) {
      for (let i = 0; i < record.Test.length; i++) {
        record.Test[i]?.resultPhoto.map(async (file) => {
          const arr = file.split(/[./]/);
          await DeleteUniqueImage(arr[9]);
        });
      }
    }

    if (record.idespecialist.toString() == user._id.toString()) {

      if ('generalInfo' in record) {
        record.generalInfo.bornDate =
          req.body?.generalInfo?.bornDate || record.generalInfo.bornDate;
        record.generalInfo.bornPlace =
          req.body?.generalInfo?.bornPlace || record.generalInfo.bornPlace;
        record.generalInfo.ci =
          req?.body?.generalInfo.ci || record.generalInfo.ci;
        record.generalInfo.civilState =
          req.body?.generalInfo?.civilState || record.generalInfo.civilState;

        record.contactInfo.address =
          req.body?.contactInfo?.address || record.contactInfo.address;
        record.contactInfo.phone =
          req.body?.contactInfo?.phone || record.contactInfo.phone;

        record.medicalInfo.height =
          req.body?.medicalInfo?.height || record.medicalInfo.height;
        record.medicalInfo.imc =
          req.body?.medicalInfo?.imc || record.medicalInfo.imc;
        record.medicalInfo.weight =
          req.body?.medicalInfo?.weight || record.medicalInfo.weight;
        record.Test = req.body.Test || record.Test;
      }

      if('nutriInfo' in record){
        record.nutriInfo.waistMeasurement = req.body?.nutriInfo?.waistMeasurement || record.nutriInfo.waistMeasurement;
        record.nutriInfo.backMeasurement = req.body?.nutriInfo?.backMeasurement || record.nutriInfo.backMeasurement
        record.nutriInfo.exercisePerWeek = req.body?.nutriInfo?.exercisePerWeek || record.nutriInfo.exercisePerWeek
        record.nutriInfo.dailyWater = req.body?.nutriInfo?.dailyWater || record.nutriInfo.dailyWater
        record.nutriInfo.comments = req.body?.nutriInfo?.comments || record.nutriInfo.comments
        record.nutriInfo.isAllowed = req.body?.nutriInfo?.isAllowed || record.nutriInfo.isAllowed
      }


      if('psychologistInfo' in record){
        record.psychologistInfo.comments = req.body?.psychologistInfo?.comments || record.psychologistInfo.comments
        record.psychologistInfo.isAllowed = req.body?.psychologistInfo?.isAllowed || record.psychologistInfo.isAllowed
      }

      await record.save();

      if (Test && Test.length > 0) {
        for (let i = 0; i < Test.length; i++) {
          if (Test && Test[i]?.resultPhoto) {
            try {
              let url = await uploadMultipleImages(Test[i].resultPhoto);
              record.Test[i].resultPhoto = [];
              url.map((file) => {
                record.Test[i].resultPhoto.push(file.file);
              });
            } catch (error) {
              console.log(error);
            }
          } else {
            console.log("No hay imagenes");
          }
        }
        await record.save();
      }

      res.status(200).json({ msg: record, status: true });
    } else {
      const error = new Error("Usuario no autorizado para esta accion");
      return res.status(400).json({ msg: error.message, status: false });
    }
  } catch (error) {
    console.log(error);
    res.status(404).json({ msg: error.message });
  }
};

const getRecordsRecent = async (req, res) => {
  const { user } = req;

  if (!user.isDoctor) {
    const error = new Error("Usuario no autorizado para esta accion");
    return res.status(400).json({ msg: error.message, status: false });
  }

  try {
    const record = await Record.find();

    record.sort((date1, date2) => date2.updatedAt - date1.updatedAt);

    res.status(200).json({ data: record, status: true });
  } catch (error) {
    res.status(400).json({ msg: error.message, status: false });
  }
};

export { createRecord, editRecords, getRecordsRecent };
