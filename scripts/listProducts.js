import mongoose from 'mongoose';
import Product from '../models/Product.js';

const MONGO_URI = process.env.MONGODB_URI || 'mongodb+srv://alexdyna:140305ca@vendas.8zxehka.mongodb.net/?retryWrites=true&w=majority&appName=Vendas';

async function listProducts() {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('Conectado ao banco de dados');

        const products = await Product.find({});
        console.log('Produtos cadastrados:');
        products.forEach(product => {
            console.log(`- ID: ${product._id}, Nome: ${product.name || product.title || 'N/A'}`);
        });

        await mongoose.disconnect();
    } catch (error) {
        console.error('Erro ao listar produtos:', error);
    }
}

listProducts();
