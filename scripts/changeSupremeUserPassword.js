import mongoose from 'mongoose';
import User from '../models/User.js';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

async function changeSupremeUserPassword(newUsername, newPassword) {
    try {
        const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/catalogo_db';
        await mongoose.connect(mongoUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        const user = await User.findOne({ username: 'adminsupremo' });
        if (!user) {
            console.log('Usuário adminsupremo não encontrado.');
            await mongoose.disconnect();
            return;
        }

        user.username = newUsername;

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(newPassword, salt);

        await user.save();
        console.log(`Usuário e senha do adminsupremo foram atualizados para: ${newUsername}`);

        await mongoose.disconnect();
    } catch (error) {
        console.error('Erro ao atualizar usuário e senha do adminsupremo:', error);
    }
}

// Exemplo de uso: alterar para novo usuário e senha
// changeSupremeUserPassword('novoUsuario', 'novaSenha');

if (process.argv.length !== 4) {
    console.log('Uso: node scripts/changeSupremeUserPassword.js <novoUsuario> <novaSenha>');
    process.exit(1);
}

const newUsername = process.argv[2];
const newPassword = process.argv[3];

changeSupremeUserPassword(newUsername, newPassword);
