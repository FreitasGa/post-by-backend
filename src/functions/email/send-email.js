import handler from '../../../libs/handler-lib';
import nodemailer from 'nodemailer';

export const main = handler(async (event, context) => {
  const { userEmail, userName } =
    typeof event.body === 'string' ? JSON.parse(event.body) : event.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'postby.lawgile@gmail.com',
      pass: 'postby@123',
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const date = new Date();
  const htmlToSend = `
        <center>
            <img style="margin:20px 0 0 0" width="180px" src="https://post-by-uploads.s3.sa-east-1.amazonaws.com/logo/logo3x.png">
            <h2 style="color:black">Olá ${userName}, tudo bem? </h2>
            <p style="margin:0;color:black;font-size:1.2em" >Vim aqui confirmar que sua reserva foi feita!</p>
            <p style="color:black" >${date.getDay()}/${date.getMonth() + 1} - ${date.getHours()}:${date.getMinutes()}</p>
        </center>
    `;

  const emailSent = await transporter.sendMail({
    from: 'Post-by <postby.lawgile@gmail.com>',
    to: userEmail,
    subject: 'Nova reserva!',
    text: 'Nova reserva realizada',
    html: htmlToSend,
  });

  if (!emailSent.messageId) {
    throw new Error('Falha no envio');
  }

  return 'Email enviado com sucesso!';
});
