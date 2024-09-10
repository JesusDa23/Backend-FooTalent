import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/env.config.js';

export const createToken = (user) => {
    return jwt.sign(user, JWT_SECRET, { expiresIn: '8h' });
};
