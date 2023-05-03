import createId from "../helpers/createId.js";
import createJWT from "../helpers/createJWT.js";
import { emailForgetPassword } from "../helpers/emails.js";
import User from "../models/Users.js";

const register = async (req, res) => {
  const { email, isPatient, profile } = req.body;
  const {
    bornDate,
    address,
    bornPlace,
    ci,
    civilState,
    height,
    imc,
    ocupation,
    phone,
    profession,
    referredBy,
    weight,
  } = profile;

  const UserExist = await User.findOne({ email: email });

  if (UserExist) {
    const error = new Error("Usuario ya registrado");
    return res.status(400).json({ msg: error.message });
  }

  try {
    if (isPatient) {
      if (
        bornDate &&
        address &&
        bornPlace &&
        ci &&
        civilState &&
        height &&
        imc &&
        ocupation &&
        phone &&
        profession &&
        referredBy &&
        weight
      ) {
        const user = new User(req.body);
        user.token = "";
        await user.save();
      } else {
        const error = new Error("Todos los datos son requeridos");
        return res.status(400).json({ msg: error.message });
      }
    } else {
      const user = new User(req.body);
      user.profile = null;
      user.token = "";
      await user.save();
    }
    res.status(200).json({ msg: "Usuario creado Correctamente" });
  } catch (error) {
    console.log(error.message);
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
      firstname: user.firstname,
      email: user.email,
      token: createJWT(user._id),
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

export { register, login, forgetPassword, findoutToken, NewPassword };
