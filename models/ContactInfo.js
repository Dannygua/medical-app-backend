import mongoose from "mongoose";

const ContactInfoSchema = mongoose.Schema(
    {
        idpatient: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Usuarios",
            required: true,
        },
        address: {
            type: String,
            trim: true,
        },
        phone: {
            type: Number,
            trim: true,
        },
    },

    {
        timestamps: true,
    }
);

const ContactInfo = mongoose.model("ContactInfo", ContactInfoSchema);

export default ContactInfo;
