import nodemailer from 'nodemailer'
import { NODEMAILER_PASS, EMAIL_NOTIFICATION } from '../config/env.config.js'
import { createToken } from '../utils/createToken.js'

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    service: 'gmail',
    auth: {
        user: EMAIL_NOTIFICATION,
        pass: NODEMAILER_PASS
    }
})

const NotificationController = {
    sendEmail: async (email, subject, message) => {
        const mailOptions = {
            from: `Footalent <${EMAIL_NOTIFICATION}>`,
            to: email,
            subject,
            html: `
                <h1>${subject}</h1>
                <p>${message}</p>
            `
        }
        const infoNotification = await transporter.sendMail(mailOptions)
        return infoNotification
    },
    sendEmailResetPassword: async (email, subject, message) => {
        const linkReset = await createToken({ email })
        const mailOptions = {
            from: `Footalent <${EMAIL_NOTIFICATION}>`,
            to: email,
            subject,
            html: `
                <h1>${subject}</h1>
                <p>${message}</p>
                <a href="http://localhost:4200/auth/reset-password/${linkReset}">Resetear contraseña</a>
            `
        }
        const infoNotification = await transporter.sendMail(mailOptions)
        return infoNotification
    }
}

export default NotificationController
