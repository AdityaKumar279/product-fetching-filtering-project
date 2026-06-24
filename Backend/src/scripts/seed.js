import { connectDB, disconnectDB } from '../config/database.js';
import Product from '../models/Product.js';
import { faker } from '@faker-js/faker';

const TOTAL_PRODUCTS = 200000;
const BATCH_SIZE = 15000; // Optimal batch size for bulk insert

const categories = [
  'Electronics',
  'Clothing',
  'Books',
  'Home & Kitchen',
  'Sports & Outdoors',
  'Toys & Games',
  'Beauty & Personal Care',
  'Food & Grocery',
  'Furniture',
  'Automotive',
];

const generateProductBatch = (size) => {
  const products = [];
  for (let i = 0; i < size; i++) {
    products.push({
      name: faker.commerce.productName(),
      category: faker.helpers.arrayElement(categories),
      price: parseFloat(faker.commerce.price({ min: 5, max: 5000 })),
    });
  }
  return products;
};

const seedDatabase = async () => {
  try {
    console.log('🚀 Starting database seed...\n');

    await connectDB();

    // Clear existing data
    console.log('🧹 Clearing existing products...');
    await Product.deleteMany({});
    console.log('✓ Database cleared\n');

    let insertedCount = 0;
    const startTime = Date.now();

    console.log(`⏳ Generating and inserting ${TOTAL_PRODUCTS.toLocaleString()} products in batches of ${BATCH_SIZE.toLocaleString()}...\n`);

    // Process in batches
    for (let i = 0; i < TOTAL_PRODUCTS; i += BATCH_SIZE) {
      const remainingProducts = TOTAL_PRODUCTS - i;
      const currentBatchSize = Math.min(BATCH_SIZE, remainingProducts);

      // Generate batch
      const batch = generateProductBatch(currentBatchSize);

      // Bulk insert
      await Product.insertMany(batch, { ordered: false });

      insertedCount += currentBatchSize;
      const progress = ((insertedCount / TOTAL_PRODUCTS) * 100).toFixed(2);
      const elapsedTime = ((Date.now() - startTime) / 1000).toFixed(2);

      console.log(
        `✓ Inserted ${insertedCount.toLocaleString()}/${TOTAL_PRODUCTS.toLocaleString()} products (${progress}%) - ${elapsedTime}s elapsed`
      );
    }

    const totalTime = ((Date.now() - startTime) / 1000).toFixed(2);
    const productsPerSecond = (TOTAL_PRODUCTS / totalTime).toFixed(0);

    console.log(`\n✅ Seeding completed successfully!`);
    console.log(`📊 Statistics:`);
    console.log(`   - Total products: ${TOTAL_PRODUCTS.toLocaleString()}`);
    console.log(`   - Total time: ${totalTime}s`);
    console.log(`   - Throughput: ${productsPerSecond.toLocaleString()} products/sec\n`);

    // Verify the data
    const count = await Product.countDocuments();
    console.log(`🔍 Database verification: ${count.toLocaleString()} products found in database`);

    // Show category distribution
    const categoryStats = await Product.aggregate([
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 },
        },
      },
      {
        $sort: { count: -1 },
      },
    ]);

    console.log(`\n📈 Category Distribution:`);
    categoryStats.forEach((stat) => {
      const percentage = ((stat.count / count) * 100).toFixed(2);
      console.log(`   - ${stat._id}: ${stat.count.toLocaleString()} (${percentage}%)`);
    });

    await disconnectDB();
  } catch (error) {
    console.error(`\n✗ Seeding failed: ${error.message}`);
    console.error(error);
    await disconnectDB();
    process.exit(1);
  }
};

seedDatabase();
