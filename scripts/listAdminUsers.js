import mongoose from 'mongoose';
import User from '../models/User.js';
import dotenv from 'dotenv';

dotenv.config();

async function listAdminUsers() {
    try {
        const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/catalogo_db';
        await mongoose.connect(mongoUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        const admins = await User.find({ isAdmin: true }).select('username isAdmin');
        console.log('Usuários administradores cadastrados:');
        admins.forEach(admin => {
            console.log(`- ${admin.username}`);
        });

        await mongoose.disconnect();
    } catch (error) {
        console.error('Erro ao listar usuários administradores:', error);
    }
}

listAdminUsers();
