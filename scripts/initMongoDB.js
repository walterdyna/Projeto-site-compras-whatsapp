const { MongoClient, ObjectId } = require('mongodb');

const uri = "mongodb://localhost:27017";
const dbName = "devclub_project";

async function connectDB() {
  const client = new MongoClient(uri);
  await client.connect();
  const db = client.db(dbName);
  return { client, db };
}

async function createCollections(db) {
  await db.createCollection("users");
  await db.createCollection("products");
  await db.createCollection("orders");
}

async function insertUsers(db) {
  const users = [
    {
      username: "alexdyna",
      passwordHash: "hash_da_senha", // Substitua pelo hash real
      isAdmin: true,
      email: "alexdyna@example.com",
      createdAt: new Date()
    },
    {
      username: "queziacastelo",
      passwordHash: "hash_da_senha",
      isAdmin: true,
      email: "queziacastelo@example.com",
      createdAt: new Date()
    }
  ];
  const result = await db.collection("users").insertMany(users);
  return result.insertedIds;
}

async function insertProducts(db) {
  const products = [
    {
      name: "Produto A",
      price: 10.99,
      stock: 100,
      description: "Descrição do Produto A",
      category: "Categoria 1",
      origem: "Brasil",
      imageUrl: "",
      createdAt: new Date()
    },
    {
      name: "Produto B",
      price: 20.50,
      stock: 50,
      description: "Descrição do Produto B",
      category: "Categoria 2",
      origem: "Argentina",
      imageUrl: "",
      createdAt: new Date()
    }
  ];
  const result = await db.collection("products").insertMany(products);
  return result.insertedIds;
}

async function insertOrder(db, userId, productOrders) {
  // productOrders is an array of objects: { productId: ObjectId, quantity: number }
  const totalPrice = productOrders.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const order = {
    userId: ObjectId(userId),
    products: productOrders.map(item => ({
      productId: ObjectId(item.productId),
      quantity: item.quantity
    })),
    totalPrice,
    status: "pending",
    createdAt: new Date()
  };
  const result = await db.collection("orders").insertOne(order);
  return result.insertedId;
}

async function main() {
  const { client, db } = await connectDB();
  try {
    await createCollections(db);
    const userIds = await insertUsers(db);
    const productIds = await insertProducts(db);

    // Example order insertion with first user and products
    await insertOrder(db, userIds[0], [
      { productId: productIds[0], quantity: 2, price: 10.99 },
      { productId: productIds[1], quantity: 1, price: 20.50 }
    ]);

    console.log("Banco de dados inicializado com sucesso.");
  } catch (err) {
    console.error("Erro ao inicializar o banco de dados:", err);
  } finally {
    await client.close();
  }
}

module.exports = {
  connectDB,
  createCollections,
  insertUsers,
  insertProducts,
  insertOrder,
  main
};

// To run the script standalone, uncomment below:
// main();
