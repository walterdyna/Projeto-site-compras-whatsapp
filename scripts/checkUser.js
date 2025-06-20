import mongoose from 'mongoose';
import User from '../models/User.js';
import dotenv from 'dotenv';

dotenv.config();

async function checkUser(username) {
    try {
        const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/catalogo_db';
        await mongoose.connect(mongoUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        const user = await User.findOne({ username }).select('username isAdmin password');
        if (!user) {
            console.log(`Usuário "${username}" não encontrado.`);
        } else {
            console.log(`Usuário encontrado:`);
            console.log(`- Username: ${user.username}`);
            console.log(`- isAdmin: ${user.isAdmin}`);
            console.log(`- Password hash: ${user.password}`);
        }

        await mongoose.disconnect();
    } catch (error) {
        console.error('Erro ao verificar usuário:', error);
    }
}

if (process.argv.length !== 3) {
    console.log('Uso: node scripts/checkUser.js <username>');
    process.exit(1);
}

const username = process.argv[2];
checkUser(username);
