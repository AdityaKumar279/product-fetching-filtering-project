import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 255,
    },
    category: {
      type: String,
      required: true,
      index: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
      validate: {
        validator: (v) => v >= 0,
        message: 'Price must be a positive number',
      },
    },
  },
  {
    timestamps: true,
    collection: 'products',
  }
);

// Create index on category for filtering
productSchema.index({ category: 1 });

// Create index on created_at for cursor-based pagination and sorting
productSchema.index({ createdAt: -1 });

// Compound index optimized for filtering and cursor-based pagination
// Includes _id as tie-breaker to handle products with identical timestamps
productSchema.index({ category: 1, createdAt: -1, _id: -1 });

const Product = mongoose.model('Product', productSchema);

export default Product;
