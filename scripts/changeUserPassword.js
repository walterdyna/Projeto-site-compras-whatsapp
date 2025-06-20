import mongoose from 'mongoose';
import User from '../models/User.js';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

async function changeUserPassword(username, newPassword) {
    try {
        const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/catalogo_db';
        await mongoose.connect(mongoUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        const user = await User.findOne({ username });
        if (!user) {
            console.log(`Usuário ${username} não encontrado.`);
            await mongoose.disconnect();
            return;
        }

        // Set password as plain text to trigger pre-save hook hashing
        user.password = newPassword;

        await user.save();
        console.log(`Senha do usuário ${username} foi atualizada.`);

        await mongoose.disconnect();
    } catch (error) {
        console.error('Erro ao atualizar senha do usuário:', error);
    }
}

if (process.argv.length !== 4) {
    console.log('Uso: node scripts/changeUserPassword.js <username> <novaSenha>');
    process.exit(1);
}

const username = process.argv[2];
const newPassword = process.argv[3];

changeUserPassword(username, newPassword);
