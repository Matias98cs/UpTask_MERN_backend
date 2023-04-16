import nodemailer from "nodemailer";

const emailRegistro = async (datos) => {
  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const { nombre, email, token } = datos;
  const info = await transport.sendMail({
    from: "UpTask - Administrador de proyectos",
    to: email,
    subject: "UpTask Comprueba tu cuenta en Administrador de proyectos",
    text: "Comprueba tu cuenta en Administrador de proyectos",
    html: `<p>Hola: ${nombre}, comprueba tu cuenta en UpTask - Administrador de proyectos.</p>
            <p>Tu cuenta ya esta lista, solo debes comprobarla en el siguiente enlace:
            <a href="${process.env.FRONTEND_URL}/confirmar/${token}">Comprobar Cuenta<a/></p>

            <p>Si tu no creaste esta cuenta, puede ignorar este mensaje</p>
    `,
  });

  console.log(`Mensaje Enviado Correctamente: `, info.messageId);
};

export default emailRegistro;
