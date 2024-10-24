import cloudinary from 'cloudinary';
import { configCloudinary } from '../config/env.config.js';

export const uploadImage = async (filePath) => {
  cloudinary.v2.config(configCloudinary);

  return await cloudinary.v2.uploader.upload(filePath, {
    folder: 'user_images',
    allowed_formats: ['jpg', 'png', 'jpeg', 'webp']
  });
};

import multer from 'multer';
import path from 'path';

// Configuración de multer para guardar archivos localmente de manera temporal
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Directorio temporal para guardar las imágenes
  },
  filename: (req, file, cb) => {
    // Crear nombre único para evitar conflictos
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, `${uniqueSuffix}-${file.originalname}`);
  },
});

// Filtro para asegurar que solo se suban archivos de imagen
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
