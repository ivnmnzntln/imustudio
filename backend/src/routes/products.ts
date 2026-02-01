import { Router } from 'express';
import productController from '../controllers/ProductController.js';
import { authMiddleware, adminMiddleware } from '../middleware/auth.js';

const router = Router();

router.get('/', (req, res) => productController.getAllProducts(req, res));
router.get('/:id', (req, res) => productController.getProductById(req, res));
router.post('/sync/shopify', authMiddleware, adminMiddleware, (req, res) =>
  productController.syncShopifyProducts(req, res)
);

export default router;
