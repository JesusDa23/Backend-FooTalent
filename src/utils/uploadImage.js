import cloudinary from 'cloudinary';
import { configCloudinary } from '../config/env.config.js';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

cloudinary.v2.config(configCloudinary);

export const uploadImage = async (filePath) => {
  try {
    return await cloudinary.v2.uploader.upload(filePath, {
      folder: 'user_images',
      allowed_formats: ['jpg', 'png', 'jpeg', 'webp']
    });
  } catch (error) {
    throw new Error(`Error al subir la imagen: ${error.message}`);
  }
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = 'uploads/';
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, `${uniqueSuffix}-${file.originalname}`);
  },
});

const fileFilter = (req, file, cb) => {
  const fileTypes = /jpeg|jpg|png|webp/;
  const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = fileTypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error('Solo se permiten archivos de imagen'));
  }
};

// Inicializar multer
export const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 1024 * 1024 * 5 }, // Limitar el tamaño del archivo a 5MB
});
