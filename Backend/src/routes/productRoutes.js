import express from 'express';
import { getProducts } from '../controllers/productController.js';

const router = express.Router();

// GET /api/products - Retrieve products with cursor-based pagination and category filtering
router.get('/', getProducts);

export default router;
