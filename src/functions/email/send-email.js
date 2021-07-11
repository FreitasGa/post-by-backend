import handler from '../../../libs/handler-lib';
import nodemailer from 'nodemailer';

export const main = handler(async (event, context) => {
    const { user_email } =
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
        <h1>Nova reserva feita</h1>
        <br />
        <b>Vim aqui confirmar que sua reserva foi feita</b>
    `;

    const emailSent = await transporter.sendMail({
        from: 'Post-by <postby.lawgile@gmail.com>',
        to: user_email,
        subject: 'Nova reserva!',
        text: 'Nova reserva realizada',
        html: htmlToSend,
    });

    if (!emailSent.messageId) {
        throw new Error('Falha no envio');
    }

    return 'Email enviado com sucesso!';
});
