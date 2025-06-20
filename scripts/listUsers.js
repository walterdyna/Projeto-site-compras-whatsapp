import mongoose from 'mongoose';
import User from '../models/User.js';
import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || process.env.LOCAL_MONGODB_URI;

async function listUsers() {
    try {
        await mongoose.connect(MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Conectado ao MongoDB');

        const users = await User.find({}, 'username isAdmin').lean();
        console.log('Usuários cadastrados:');
        users.forEach(user => {
            console.log(`- Username: ${user.username}, isAdmin: ${user.isAdmin}`);
        });

        await mongoose.disconnect();
        console.log('Desconectado do MongoDB');
    } catch (error) {
        console.error('Erro ao listar usuários:', error);
        process.exit(1);
    }
}

listUsers();
