import mongoose from "mongoose";

const GeneralInfoSchema = mongoose.Schema(
    {
        idpatient: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Usuarios",
            required: true,
        },

        bornDate: {
            type: Date,
            trim: true,
        },
        bornPlace: {
            type: String,
            trim: true,
        },
        ci: {
            type: String,
            trim: true,
        },
        civilState: {
            type: String,
            trim: true,
        },
        ocupation: {
            type: String,
            trim: true,
        },
        profession: {
            type: String,
            trim: true,
        },
        referredBy: {
            type: String,
            trim: true,
        },

    },

    {
        timestamps: true,
    }
);

const GeneralInfo = mongoose.model("GeneralInfo", GeneralInfoSchema);

export default GeneralInfo;
