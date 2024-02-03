import ContactInfo from "../models/ContactInfo.js";
import GeneralInfo from "../models/GeneralInfo.js";
import mongoose from "mongoose";

const generalInfoByPatient = async (req, res) => {
    try {
        const { patientId } = req.params;
        const generalInfo = await GeneralInfo.findOne({ idpatient: new mongoose.Types.ObjectId(patientId) });

        if (generalInfo) {
            res.status(200).json({ data: generalInfo, status: true });
        } else {
            res.status(200).json({ status: false });
        }

    } catch (error) {
        res.status(400).json({ msg: error.message, status: false });
    }
};


const contactInfoByPatient = async (req, res) => {
    try {
        const { patientId } = req.params;
        const contactInfo = await ContactInfo.findOne({ idpatient: new mongoose.Types.ObjectId(patientId) });

        if (contactInfo) {
            res.status(200).json({ data: contactInfo, status: true });
        } else {
            res.status(200).json({ status: false });
        }

    } catch (error) {
        res.status(400).json({ msg: error.message, status: false });
    }
};

export { generalInfoByPatient, contactInfoByPatient }