import dotenv from "dotenv";

dotenv.config();

export const JWT_SECRET = process.env.JWT_SECRET;
export const db = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  pass: process.env.DB_PASS,
  name: process.env.DB_NAME,
};
export const configCloudinary = {
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME ?? "davwvzv8z",
  api_key: process.env.CLOUDINARY_API_KEY ?? "248289819347799",
  api_secret: process.env.CLOUDINARY_API_SECRET ?? "Q1Z9Q6",
};

export const NODEMAILER_PASS = process.env.NODEMAILER_PASS;
