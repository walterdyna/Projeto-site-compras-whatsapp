import mongoose from 'mongoose';
import User from '../models/User.js';
import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || process.env.LOCAL_MONGODB_URI;

async function showUserPasswordHash() {
    try {
        await mongoose.connect(MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Conectado ao MongoDB');

        const username = 'alexdyna';
        const user = await User.findOne({ username });
        if (user) {
            console.log(`Usuário: ${username}`);
            console.log(`Hash da senha armazenada: ${user.password}`);
        } else {
            console.log(`Usuário ${username} não encontrado.`);
        }

        await mongoose.disconnect();
        console.log('Desconectado do MongoDB');
    } catch (error) {
        console.error('Erro ao buscar hash da senha:', error);
        process.exit(1);
    }
}

showUserPasswordHash();
