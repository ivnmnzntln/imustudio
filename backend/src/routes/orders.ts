import { Router } from 'express';
import orderController from '../controllers/OrderController.js';
import { authMiddleware, adminMiddleware } from '../middleware/auth.js';

const router = Router();

router.post('/', authMiddleware, (req, res) => orderController.createOrder(req, res));
router.get('/', authMiddleware, (req, res) => orderController.getUserOrders(req, res));
router.get('/all', authMiddleware, adminMiddleware, (req, res) =>
  orderController.getAllOrders(req, res)
);
router.get('/:id', authMiddleware, (req, res) => orderController.getOrder(req, res));
router.put('/:id', authMiddleware, adminMiddleware, (req, res) =>
  orderController.updateOrderStatus(req, res)
);

export default router;
