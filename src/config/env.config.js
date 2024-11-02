export const JWT_SECRET = process.env.JWT_SECRET

export const configCloudinary = {
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME ?? 'di2ofhevm',
    api_key: process.env.CLOUDINARY_API_KEY ?? '196761252387495',
    api_secret: process.env.CLOUDINARY_API_SECRET ?? 'AtKsKtJDVSLfm5MCpkElS7godLM'
}

export const NODEMAILER_PASS = process.env.NODEMAILER_PASS
export const DB_URI = process.env.DB_URI
export const EMAIL_NOTIFICATION = process.env.EMAIL_NOTIFICATION