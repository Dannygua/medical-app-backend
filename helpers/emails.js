import nodemailer from "nodemailer";
export const emailForgetPassword = async (datos) => {
  const { firstname, email, token } = datos;

  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  //Informacion email

  const info = await transport.sendMail({
    from: '"Administrador de proyectos"',
    to: email,
    subject: "UpTask - Reestablece tu Password",
    text: "Reestablece tu Password",
    html: `<p>Hola: ${firstname} has solicitado reestablecer tu contraseña</p>
        <p>Para poder crear una nueva contraseña solo debes hacer clic en el siguiente enlace:</p>
        <a href="${process.env.FRONTEND_URL}/forget-password/${token}">Reestablecer Password</a>
        <p>Si tu no solicitaste este servicio, puedes ignorar este email</p>
        `,
  });
};
