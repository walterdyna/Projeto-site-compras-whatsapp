import mongoose from 'mongoose';
import User from '../models/User.js';
import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || process.env.LOCAL_MONGODB_URI;

async function checkDuplicateUsers() {
    try {
        await mongoose.connect(MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Conectado ao MongoDB');

        const username = 'alexdyna';
        const users = await User.find({ username });
        console.log(`Número de usuários com username "${username}": ${users.length}`);
        users.forEach((user, index) => {
            console.log(`Usuário ${index + 1}: ID=${user._id}, senha hash=${user.password}`);
        });

        await mongoose.disconnect();
        console.log('Desconectado do MongoDB');
    } catch (error) {
        console.error('Erro ao verificar usuários duplicados:', error);
        process.exit(1);
    }
}

checkDuplicateUsers();
