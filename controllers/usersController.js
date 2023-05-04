import createId from "../helpers/createId.js";
import createJWT from "../helpers/createJWT.js";
import { emailCredentials, emailForgetPassword } from "../helpers/emails.js";
import User from "../models/Users.js";

const register = async (req, res) => {
  const { email, isPatient, isDoctor, profile } = req.body;

  const UserExist = await User.findOne({ email: email });

  if (UserExist) {
    const error = new Error("Usuario ya registrado");
    return res.status(400).json({ msg: error.message, status: false });
  }

  try {
    const AutoPassword = createId();
    if (isPatient) {
      if (
        profile?.address &&
        profile?.bornPlace &&
        profile?.bornDate &&
        profile?.ci &&
        profile?.civilState &&
        profile?.height &&
        profile?.imc &&
        profile?.ocupation &&
        profile?.phone &&
        profile?.profession &&
        profile?.referredBy &&
        profile?.weight
      ) {
        const user = new User(req.body);
        user.password = AutoPassword;
        user.token = "";

        await user.save();
        emailCredentials({
          firstname: user.firstname,
          email: user.email,
          password: AutoPassword,
        });
      } else {
        const error = new Error("Todos los datos son requeridos");
        return res.status(400).json({ msg: error.message, status: false });
      }
    } else if (isDoctor) {
      const user = new User(req.body);
      user.profile = null;
      user.token = "";
      await user.save();
    }
    res
      .status(200)
      .json({ msg: "Usuario creado Correctamente", status: true });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ msg: error.message, status: false })
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    const error = new Error("El usuario no existe");
    return res.status(400).json({ msg: error.message });
  }

  if (await user.comprobarPassword(password)) {
    res.json({
      _id: user._id,
      token: createJWT(user._id),
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      isPatient: user.isPatient, 
      isDoctor: user.isDoctor
    });
  } else {
    const error = new Error("El password es incorrecto");
    return res.status(403).json({ msg: error.message });
  }
};

const forgetPassword = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    const error = new Error("El usuario no existe");
    return res.status(400).json({ msg: error.message });
  }

  try {
    user.token = createId();
    await user.save();
    emailForgetPassword({
      email: user.email,
      firstname: user.firstname,
      token: user.token,
    });
    res.status(200).json({
      msg: "Hemos enviado un email a su correo con las istrucciones para recuperar su contraseña",
    });
  } catch (error) {
    console.log(error);
  }
};

const findoutToken = async (req, res) => {
  const { token } = req.params;
  const ValidToken = await User.findOne({ token });
  if (ValidToken) {
    res.status(200).json({ msg: "Token valido y el usuario existe" });
  } else {
    const error = new Error("Token no valido");
    return res.status(400).json({ msg: error.message });
  }
};

const NewPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  const user = await User.findOne({ token });
  if (user) {
    try {
      user.password = password;
      user.token = "";

      await user.save();
      res.json({ msg: "Contraseña Modificado Correctamente" });
    } catch (error) {
      console.log(error);
    }
  } else {
    const error = new Error("Token no valido");
    return res.status(400).json({ msg: error.message });
  }
};


const getPatients = async (req, res) => {
  try{
   const patients = await User.find({ isPatient: true });
   res.status(200).json({ data: patients, status: true })
  }catch(error){
    res.status(400).json({ msg: error.message, status: false })
  }
}


export { register, login, forgetPassword, findoutToken, NewPassword, getPatients };
