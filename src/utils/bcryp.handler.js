import { hash, compare } from 'bcrypt';
const SALT_ROUNDS = 10;

export const encrypt = async (password) => {
    const passwordHash = await hash(password, SALT_ROUNDS);
    return passwordHash;
};

export const verified = async (password, passwordHash) => {
    const isCorrect = await compare(password, passwordHash);
    return isCorrect;
};
