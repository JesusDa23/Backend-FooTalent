import nodemailer from 'nodemailer'
import { NODEMAILER_PASS, EMAIL_NOTIFICATION } from '../config/env.config.js'
import { createToken } from '../utils/createToken.js'
import jwt from 'jsonwebtoken';

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
                    <a target="_blank" href="https://mix-livid.vercel.app" style="background-color: #1E88E5; color: #fff; padding: 10px 20px; text-decoration: none; font-size: 14px; border-radius: 5px;">Ir a la Plataforma</a>
                </div>
                <footer style="text-align: center; font-size: 12px; color: #888; margin-top: 30px;">
                    <p>Fleet Management - Soluciones para la gestión eficiente de flotas vehiculares</p>
                    <p><a target="_blank" href="https://mix-livid.vercel.app" style="color: #1E88E5; text-decoration: none;">Visítanos</a> | <a href="mailto:contact@fleetmanagement.com" style="color: #1E88E5; text-decoration: none;">Contáctanos</a></p>
                </footer>
            </div>
        `
        }
        const infoNotification = await transporter.sendMail(mailOptions)
        return infoNotification
    },
    sendEmailResetPassword: async (email, subject, message, tokenChangePassword) => {
        const mailOptions = {
            from: `Footalent <${EMAIL_NOTIFICATION}>`,
            to: email,
            subject,
            html: `
                <div style="font-family: Arial, sans-serif; color: #333; padding: 20px; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; background-color: #f9f9f9;">
                    <h2 style="color: #2c3e50; text-align: center; margin-bottom: 20px;">${subject}</h2>
                    <p style="font-size: 16px; text-align: center;">${message}</p>
                    <div style="text-align: center; margin-top: 20px;">
                        <a target="_blank" href="https://mix-livid.vercel.app/change-password-for-email/${tokenChangePassword}" 
                           style="
                             display: inline-block;
                             padding: 10px 20px;
                             color: #ffffff;
                             background-color: #007bff;
                             text-decoration: none;
                             border-radius: 5px;
                             font-size: 16px;">
                           Cambiar contraseña
                        </a>
                    </div>
                    <p style="font-size: 12px; color: #888; text-align: center; margin-top: 20px;">
                        Si no solicitaste este cambio, puedes ignorar este mensaje.
                    </p>
                    <footer style="text-align: center; font-size: 12px; color: #888; margin-top: 30px;">
                        <p>Fleet Management - Soluciones para la gestión eficiente de flotas vehiculares</p>
                        <p><a href="https://mix-livid.vercel.app" style="color: #007bff; text-decoration: none;">Visítanos</a> | 
                           <a href="mailto:contact@fleetmanagement.com" style="color: #007bff; text-decoration: none;">Contáctanos</a></p>
                    </footer>
                </div>
            `
        };
    
        const infoNotification = await transporter.sendMail(mailOptions);
        console.log(infoNotification);
        return infoNotification;
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
                    <a href="https://mix-livid.vercel.app/login" style="background-color: #1E88E5; color: #fff; padding: 10px 20px; text-decoration: none; font-size: 14px; border-radius: 5px;">Ir a la Plataforma</a>
                </div>
                <footer style="text-align: center; font-size: 12px; color: #888; margin-top: 30px;">
                    <p>Fleet Management - Soluciones para la gestión eficiente de flotas vehiculares</p>
                    <p><a href="https://mix-livid.vercel.app/login" style="color: #1E88E5; text-decoration: none;">Visítanos</a> | <a href="mailto:contact@fleetmanagement.com" style="color: #E53935; text-decoration: none;">Contáctanos</a></p>
                </footer>
            </div>
        `
        }
        const infoNotification = await transporter.sendMail(mailOptions)
        return infoNotification
    }
}

export default NotificationController
