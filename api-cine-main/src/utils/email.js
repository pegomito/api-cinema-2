
import nodemailer from 'nodemailer';
import 'dotenv/config';

async function sendMail(to, name, body, subject) {

    const smtp = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: process.env.EMAIL_USER , // email
            pass: process.env.EMAIL_PASS  // e senha de acesso

        }
    });

    await smtp.sendMail({
        to,
        subject,
        html: 
            `<h1>Olá ${name}</h1>
            <p>${body}</p>
            <p>Atenciosamente,</p>
            <p>Equipe do cinema dos crias</p>
            `
    });

}

export default sendMail;