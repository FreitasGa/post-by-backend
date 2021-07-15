import handler from '../../../libs/handler-lib';
import nodemailer from 'nodemailer';

export const main = handler(async (event, context) => {
  const { userEmail } =
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

  const htmlToSend = `
        <center>
            <h2>Nova reserva feita</h2>
            <p style="margin:0" >Opa, tudo bem?</p>
            <p style="margin:0" >Vim aqui confirmar que sua reserva foi feita!</p>
            <img style="margin:20px 12px" width="248" src="https://i.giphy.com/media/tIeCLkB8geYtW/giphy.gif">
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
