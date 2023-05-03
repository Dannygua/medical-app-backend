import sendEmail from "../utils/sendEmail.js";

export const emailForgetPassword = async (datos) => {
  const { firstname, email, token } = datos;
  console.log(email);

  try {
    await sendEmail({
      //the client email
      to: `${email}`,
      //sendGrid sender id
      from: "drbariatrico250@gmail.com",
      subject: "Nicecode - Reestablece tu Password",
      text: "Reestablece tu Password",
      html: `<p>Hola: ${firstname} has solicitado reestablecer tu contraseña</p>
      <p>Para poder crear una nueva contraseña solo debes hacer clic en el siguiente enlace:</p>
      <a href="${process.env.FRONTEND_URL}/forget-password/${token}">Reestablecer Password</a>
      <p>Si tu no solicitaste este servicio, puedes ignorar este email</p>
      `,
    });
  } catch (error) {
    console.log(error);
  }
};

export const emailCredentials = async (datos) => {
  const { firstname, email, password } = datos;
  console.log(email);

  try {
    await sendEmail({
      //the client email
      to: `${email}`,
      //sendGrid sender id
      from: "drbariatrico250@gmail.com",
      subject: "Nicecode - Credenciales de seguridad",
      text: "Credenciales de seguridad",
      html: `<p>Hola: ${firstname} te han asignado al sistema medico </p>
      <p>Para poder ingresar al sistema debes hacerlo mediante las credenciale de seguridad que te compartimos a continuacion</p>
      <p> Email: ${email} </p>
      <p> Contraseña: ${password} </p>
      <p> Puedes ingresar al sistema mediante el siguiente enlace </p>
      <a href="${process.env.FRONTEND_URL}">MEDICAL APP</a>
      <p>Si tu no solicitaste este servicio, puedes ignorar este email</p>
      `,
    });
  } catch (error) {
    console.log(error);
  }
};
