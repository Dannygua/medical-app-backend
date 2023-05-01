import generarId from "../helpers/generarId.js";
import generarJWT from "../helpers/generarJWT.js";
import Usuario from "../models/Usuario.js";

const registrar = async (req, res) => {
  //Evitar registros duplicados
  const { email } = req.body;
  const uno = 0;

  const existeUsuario = await Usuario.findOne({ email: email });

  if (existeUsuario) {
    const error = new Error("Usuario ya registrado");
    return res.status(400).json({ msg: error.message });
  }

  try {
    const usuario = new Usuario(req.body);
    usuario.token = generarId();
    await usuario.save();

    // //Enviar email de confirmacion
    // emailRegistro({
    //   email: usuario.email,
    //   nombre: usuario.nombre,
    //   token: usuario.token,
    // });

    res.json({ msg: "Usuario creado Correctamente" });
  } catch (error) {
    console.log(error);
  }
};

const autenticar = async (req, res) => {
  const { email, password } = req.body;
  const usuario = await Usuario.findOne({ email });
  if (!usuario) {
    const error = new Error("El usuario no existe");
    return res.status(400).json({ msg: error.message });
  }
  //   if (!usuario.confirmado) {
  //     const error = new Error("Tu cuenta no ha sido confirmada");
  //     return res.status(403).json({ msg: error.message });
  //   }

  if (await usuario.comprobarPassword(password)) {
    res.json({
      _id: usuario._id,
      nombre: usuario.nombre,
      email: usuario.email,
      token: generarJWT(usuario._id),
    });
  } else {
    const error = new Error("El password es incorrecto");
    return res.status(403).json({ msg: error.message });
  }
};

export { autenticar, registrar };
