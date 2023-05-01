import mongoose from "mongoose";
import bcrypt from "bcrypt";

const UserSchema = mongoose.Schema(
  {
    firstname: {
      type: String,
      require: true,
      trim: true,
    },
    lastname: {
      type: String,
      require: true,
      trim: true,
    },
    password: {
      type: String,
      require: true,
      trim: true,
    },
    email: {
      type: String,
      require: true,
      trim: true,
      unique: true,
    },
    bornDate: {
      type: Date,
      require: true,
      trim: true,
    },
    isDoctor: {
      type: Boolean,
      default: false,
    },
    isPatient: {
      type: Boolean,
      default: false,
    },
    isPychologist: {
      type: Boolean,
      default: false,
    },
    isNutri: {
      type: Boolean,
      default: false,
    },
    token: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.comprobarPassword = async function (passwordFormulario) {
  return await bcrypt.compare(passwordFormulario, this.password);
};

const User = mongoose.model("Usuario", UserSchema);

export default User;
