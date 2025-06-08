import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from '../models/Product.js';

dotenv.config();

const LOCAL_MONGODB_URI = process.env.LOCAL_MONGODB_URI || 'mongodb://localhost:27017/catalogo_db';
const ONLINE_MONGODB_URI = process.env.MONGODB_URI;

if (!ONLINE_MONGODB_URI) {
  console.error('MONGODB_URI não definida no .env');
  process.exit(1);
}

async function connectToDatabase(uri) {
  try {
    await mongoose.connect(uri);
    console.log(`Conectado ao MongoDB: ${uri}`);
  } catch (error) {
    console.error(`Erro ao conectar ao MongoDB: ${uri}`, error);
    process.exit(1);
  }
}

async function disconnectDatabase() {
  try {
    await mongoose.disconnect();
    console.log('Desconectado do MongoDB');
  } catch (error) {
    console.error('Erro ao desconectar do MongoDB', error);
  }
}

async function fetchLocalProducts() {
  await connectToDatabase(LOCAL_MONGODB_URI);
  const products = await Product.find({});
  console.log(`Produtos locais encontrados: ${products.length}`);
  await disconnectDatabase();
  return products;
}

async function upsertOnlineProducts(products) {
  await connectToDatabase(ONLINE_MONGODB_URI);
  let updatedCount = 0;
  for (const product of products) {
    const filter = { name: product.name };
    const update = {
      price: product.price,
      stock: product.stock,
      description: product.description,
      category: product.category,
      imageUrl: product.imageUrl,
      origem: product.origem
    };
    const options = { upsert: true, new: true };
    const result = await Product.findOneAndUpdate(filter, update, options);
    if (result) updatedCount++;
  }
  console.log(`Produtos online atualizados/inseridos: ${updatedCount}`);
  await disconnectDatabase();
}

async function syncLocalToOnline() {
  try {
    const localProducts = await fetchLocalProducts();
    await upsertOnlineProducts(localProducts);
    console.log('Sincronização concluída com sucesso!');
    process.exit(0);
  } catch (error) {
    console.error('Erro na sincronização:', error);
    process.exit(1);
  }
}

syncLocalToOnline();
