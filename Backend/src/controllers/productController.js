import Product from '../models/Product.js';

const decodeCursor = (cursor) => {
  if (!cursor) return null;
  try {
    const decoded = Buffer.from(cursor, 'base64').toString('utf-8');
    const [createdAt, id] = decoded.split('|');
    return { createdAt: new Date(createdAt), id };
  } catch (error) {
    console.error('Error decoding cursor:', error);
    return null;
  }
};

const encodeCursor = (product) => {
  const data = `${product.createdAt.toISOString()}|${product._id}`;
  return Buffer.from(data, 'utf-8').toString('base64');
};

export const getProducts = async (req, res) => {
  try {
    const { category, limit = 20, cursor } = req.query;
    console.log(cursor);

    // Validate and parse limit
    const parsedLimit = Math.min(parseInt(limit, 10) || 20, 100); // Max 100 items per request
    if (parsedLimit < 1) {
      return res.status(400).json({
        success: false,
        message: 'Limit must be at least 1',
      });
    }

    // Build filter query
    const filter = {};
    if (category) {
      filter.category = category;
    }

    // Decode cursor for pagination
    let cursorData = null;
    if (cursor) {
      cursorData = decodeCursor(cursor);
      if (!cursorData) {
        return res.status(400).json({
          success: false,
          message: 'Invalid cursor format',
        });
      }
    }

    // Build query with cursor logic using $or for efficient pagination
    let query;
    if (cursorData) {
      // Find products where:
      // 1. created_at is older than cursor date, OR
      // 2. created_at is the same but _id is smaller (tie-breaker for consistency)
      query = {
        ...filter,
        $or: [
          { createdAt: { $lt: cursorData.createdAt } },
          {
            createdAt: cursorData.createdAt,
            _id: { $lt: cursorData.id },
          },
        ],
      };
    } else {
      query = filter;
    }

    // Fetch one extra record to determine if there are more results
    const products = await Product.find(query)
      .sort({ createdAt: -1, _id: -1 })
      .limit(parsedLimit + 1)
      .lean(); // Use lean() for faster query execution

    // Determine if there are more results
    const hasMore = products.length > parsedLimit;
    const resultProducts = hasMore ? products.slice(0, parsedLimit) : products;

    // Generate next cursor from the last item
    let nextCursor = null;
    if (hasMore && resultProducts.length > 0) {
      nextCursor = encodeCursor(resultProducts[resultProducts.length - 1]);
    }

    return res.status(200).json({
      success: true,
      data: resultProducts,
      nextCursor,
      hasMore,
      count: resultProducts.length,
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    return res.status(500).json({
      success: false,
      message: 'Error fetching products',
      error: error.message,
    });
  }
};
