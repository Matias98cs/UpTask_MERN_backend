import nodemailer from "nodemailer";

const olvidePasswordUsuario = async (datos) => {
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
    subject: "Restablece tu password en UpTask",
    text: "Restablece tu password en UpTask",
    html: `<p>Hola: ${nombre}, has solicitado tu password.</p>
            <p>Sigue el siguiente enlace para generar un nuevo password: </p>
            <a href="${process.env.FRONTEND_URL}/olvide-password/${token}">Reestablecer Password<a/></p>
            <p>Si tu no solicitaste este email, puede ignorar este mensaje</p>
    `,
  });

  console.log(`Mensaje Enviado Correctamente`, info.messageId);
};

export default olvidePasswordUsuario;
