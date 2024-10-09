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
            <div style="font-family: Arial, sans-serif; color: #333; padding: 20px; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; background-color: #f4f4f4;">
                <h2 style="color: #1E88E5; font-size: 20px; text-align: center; margin-bottom: 15px;">${subject}</h2>
                <p style="font-size: 16px; line-height: 1.6; text-align: justify; margin-bottom: 20px;">${message}</p>
                <div style="text-align: center; margin-top: 20px;">
                    <a href="https://www.fleetmanagement.com" style="background-color: #1E88E5; color: #fff; padding: 10px 20px; text-decoration: none; font-size: 14px; border-radius: 5px;">Ir a la Plataforma</a>
                </div>
                <footer style="text-align: center; font-size: 12px; color: #888; margin-top: 30px;">
                    <p>Fleet Management - Soluciones para la gestión eficiente de flotas vehiculares</p>
                    <p><a href="https://www.fleetmanagement.com" style="color: #1E88E5; text-decoration: none;">Visítanos</a> | <a href="mailto:contact@fleetmanagement.com" style="color: #1E88E5; text-decoration: none;">Contáctanos</a></p>
                </footer>
            </div>
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
            <div style="font-family: Arial, sans-serif; color: #333; padding: 20px; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; background-color: #f9f9f9;">
                <h2 style="color: #E53935; font-size: 20px; text-align: center; margin-bottom: 20px;">${subject}</h2>
                <p style="font-size: 16px; line-height: 1.6; text-align: justify; margin-bottom: 20px;">${message}</p>
                <div style="text-align: center; margin-top: 20px;">
                    <a href="http://localhost:4200/auth/reset-password/${linkReset}" style="background-color: #E53935; color: #fff; padding: 10px 20px; text-decoration: none; font-size: 14px; border-radius: 5px;">Restablecer Contraseña</a>
                </div>
                <p style="font-size: 12px; color: #888; text-align: center; margin-top: 20px;">Si no solicitaste este cambio, puedes ignorar este mensaje.</p>
                <footer style="text-align: center; font-size: 12px; color: #888; margin-top: 30px;">
                    <p>Fleet Management - Soluciones para la gestión eficiente de flotas vehiculares</p>
                    <p><a href="https://www.fleetmanagement.com" style="color: #E53935; text-decoration: none;">Visítanos</a> | <a href="mailto:contact@fleetmanagement.com" style="color: #E53935; text-decoration: none;">Contáctanos</a></p>
                </footer>
            </div>
        `
        }
        const infoNotification = await transporter.sendMail(mailOptions)
        console.log(infoNotification)
        return infoNotification
    },
    sendReport: async (email, subject, message) => {
        const mailOptions = {
            from: `Footalent <${EMAIL_NOTIFICATION}>`,
            to: email,
            subject,
            html: `
            <div style="font-family: Arial, sans-serif; color: #333; padding: 20px; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; background-color: #f4f4f4;">
                <h2 style="color: #1E88E5; font-size: 20px; text-align: center; margin-bottom: 15px;">${subject}</h2>
                <p style="font-size: 16px; line-height: 1.6; text-align: justify; margin-bottom: 20px;">${message}</p>
                <div style="text-align: center; margin-top: 20px;">
                    <a href="https://www.fleetmanagement.com" style="background-color: #1E88E5; color: #fff; padding: 10px 20px; text-decoration: none; font-size: 14px; border-radius: 5px;">Ir a la Plataforma</a>
                </div>
                <footer style="text-align: center; font-size: 12px; color: #888; margin-top: 30px;">
                    <p>Fleet Management - Soluciones para la gestión eficiente de flotas vehiculares</p>
                    <p><a href="https://www.fleetmanagement.com" style="color: #1E88E5; text-decoration: none;">Visítanos</a> | <a href="mailto:
        `
        }
        const infoNotification = await transporter.sendMail(mailOptions)
        return infoNotification
    }
}

export default NotificationController
