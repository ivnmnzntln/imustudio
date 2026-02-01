import { Request, Response } from 'express';
import { Order } from '../models/Order.js';
import paymentService from '../services/PaymentService.js';
import shopifyService from '../services/ShopifyService.js';

export class OrderController {
  async createOrder(req: Request, res: Response): Promise<void> {
    try {
      const {
        items,
        shippingAddress,
        billingAddress,
        paymentMethod,
        notes,
      } = req.body;

      const orderNumber = `ORD-${Date.now()}`;
      let subtotal = 0;
      items.forEach((item: any) => {
        subtotal += item.price * item.quantity;
      });

      const tax = subtotal * 0.1; // 10% tax
      const shipping = 10; // Flat shipping
      const total = subtotal + tax + shipping;

      const order = new Order({
        orderNumber,
        userId: req.userId,
        items,
        shippingAddress,
        billingAddress,
        paymentMethod,
        subtotal,
        tax,
        shipping,
        discount: 0,
        total,
        notes,
        status: 'pending',
        paymentStatus: 'pending',
      });

      await order.save();

      // Create payment intent
      const paymentIntent = await paymentService.createPaymentIntent(total, 'usd', {
        orderId: order._id.toString(),
        orderNumber,
      });

      res.status(201).json({
        order,
        paymentIntent: {
          id: paymentIntent.id,
          clientSecret: paymentIntent.client_secret,
        },
      });
    } catch (error) {
      res.status(500).json({ error: 'Failed to create order' });
    }
  }

  async getOrder(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const order = await Order.findOne({
        _id: id,
        userId: req.userId,
      });

      if (!order) {
        res.status(404).json({ error: 'Order not found' });
        return;
      }

      res.json(order);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch order' });
    }
  }

  async getUserOrders(req: Request, res: Response): Promise<void> {
    try {
      const { page = 1, limit = 10 } = req.query;
      const skip = ((page as number) - 1) * (limit as number);

      const orders = await Order.find({ userId: req.userId })
        .skip(skip)
        .limit(limit as number)
        .sort({ createdAt: -1 });

      const total = await Order.countDocuments({ userId: req.userId });

      res.json({
        orders,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / (limit as number)),
        },
      });
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch orders' });
    }
  }

  async updateOrderStatus(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { status, trackingNumber } = req.body;

      const order = await Order.findByIdAndUpdate(
        id,
        { status, trackingNumber },
        { new: true }
      );

      // Sync with Shopify if available
      if (order?.shopifyOrderId) {
        await shopifyService.updateOrder(order.shopifyOrderId, {
          fulfillment_status: status,
        });
      }

      res.json(order);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update order' });
    }
  }

  async getAllOrders(req: Request, res: Response): Promise<void> {
    try {
      const { status, page = 1, limit = 20 } = req.query;
      const skip = ((page as number) - 1) * (limit as number);

      let query: any = {};
      if (status) query.status = status;

      const orders = await Order.find(query)
        .skip(skip)
        .limit(limit as number)
        .sort({ createdAt: -1 });

      const total = await Order.countDocuments(query);

      res.json({
        orders,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / (limit as number)),
        },
      });
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch orders' });
    }
  }
}

export default new OrderController();
