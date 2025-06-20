import mongoose from 'mongoose';
import User from '../models/User.js';
import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || process.env.LOCAL_MONGODB_URI;

async function syncCadastroPermissions() {
    try {
        await mongoose.connect(MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Conectado ao MongoDB');

        const sourceUsername = 'alexdyna';
        const targetUsername = 'cadastro';

        // Buscar usuário fonte
        const sourceUser = await User.findOne({ username: sourceUsername });
        if (!sourceUser) {
            console.error(`Usuário fonte "${sourceUsername}" não encontrado.`);
            process.exit(1);
        }

        // Buscar usuário alvo
        const targetUser = await User.findOne({ username: targetUsername });
        if (!targetUser) {
            console.error(`Usuário alvo "${targetUsername}" não encontrado.`);
            process.exit(1);
        }

        // Atualizar permissão isAdmin do usuário alvo para igual ao usuário fonte
        targetUser.isAdmin = sourceUser.isAdmin;
        await targetUser.save();

        console.log(`Permissão isAdmin do usuário "${targetUsername}" sincronizada com o usuário "${sourceUsername}".`);

        await mongoose.disconnect();
        console.log('Desconectado do MongoDB');
    } catch (error) {
        console.error('Erro ao sincronizar permissões:', error);
        process.exit(1);
    }
}

syncCadastroPermissions();
