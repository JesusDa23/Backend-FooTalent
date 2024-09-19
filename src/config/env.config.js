export const JWT_SECRET = process.env.JWT_SECRET

export const configCloudinary = {
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME ?? 'davwvzv8z',
    api_key: process.env.CLOUDINARY_API_KEY ?? '248289819347799',
    api_secret: process.env.CLOUDINARY_API_SECRET ?? 'Q1Z9Q6'
}

export const NODEMAILER_PASS = process.env.NODEMAILER_PASS
export const DB_URI = process.env.DB_URI
export const EMAIL_NOTIFICATION = process.env.EMAIL_NOTIFICATION
