import mongoose from 'mongoose';
import User from '../models/User.js';
import bcrypt from 'bcrypt';

const MONGO_URI = process.env.MONGODB_URI || 'mongodb+srv://alexdyna:140305ca@vendas.8zxehka.mongodb.net/?retryWrites=true&w=majority&appName=Vendas'; // String de conexão do banco online

async function changePassword() {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('Conectado ao banco de dados');

        const username = 'alexdyna'; // Usuário supremo para alterar a senha
        const newPassword = '1234567890';

        const user = await User.findOne({ username });
        if (!user) {
            console.log(`Usuário ${username} não encontrado`);
            return;
        }

        user.password = newPassword; // O hash será aplicado no pre-save do modelo
        await user.save();

        console.log(`Senha do usuário ${username} alterada com sucesso.`);
        await mongoose.disconnect();
    } catch (error) {
        console.error('Erro ao alterar a senha:', error);
    }
}

changePassword();
