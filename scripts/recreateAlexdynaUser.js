import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import User from '../models/User.js';
import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || process.env.LOCAL_MONGODB_URI;

async function recreateAlexdynaUser() {
    try {
        await mongoose.connect(MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Conectado ao MongoDB');

        const username = 'alexdyna';
        const password = '140305ca';
        // Não fazer hash manualmente, deixar o pre-save hook cuidar disso
        console.log(`Salvando usuário ${username} com senha em texto puro para hashing automático.`);

        // Deletar usuário existente
        await User.deleteOne({ username });
        console.log(`Usuário ${username} deletado (se existia).`);

        // Criar usuário novamente com senha correta (texto puro)
        const newUser = new User({
            username,
            password: password,
            isAdmin: true
        });
        await newUser.save();
        console.log(`Usuário ${username} criado com a senha correta (hash automático).`);

        await mongoose.disconnect();
        console.log('Desconectado do MongoDB');
    } catch (error) {
        console.error('Erro ao recriar usuário alexdyna:', error);
        process.exit(1);
    }
}

recreateAlexdynaUser();
