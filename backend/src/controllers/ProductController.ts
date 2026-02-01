import { Request, Response } from 'express';
import { Product } from '../models/Product.js';
import shopifyService from '../services/ShopifyService.js';

export class ProductController {
  async getAllProducts(req: Request, res: Response): Promise<void> {
    try {
      const { category, tags, status, page = 1, limit = 20, search } = req.query;
      const skip = ((page as number) - 1) * (limit as number);

      let query: any = { status: 'active' };

      if (category) query.category = category;
      if (tags) query.tags = { $in: (tags as string).split(',') };
      if (search) {
        query.$text = { $search: search as string };
      }

      const products = await Product.find(query)
        .skip(skip)
        .limit(limit as number)
        .sort({ createdAt: -1 });

      const total = await Product.countDocuments(query);

      res.json({
        products,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / (limit as number)),
        },
      });
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch products' });
    }
  }

  async getProductById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const product = await Product.findById(id);

      if (!product) {
        res.status(404).json({ error: 'Product not found' });
        return;
      }

      res.json(product);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch product' });
    }
  }

  async syncShopifyProducts(req: Request, res: Response): Promise<void> {
    try {
      const shopifyProducts = await shopifyService.getProducts();

      for (const shopifyProduct of shopifyProducts) {
        const existingProduct = await Product.findOne({ shopifyId: shopifyProduct.id });

        const productData = {
          shopifyId: shopifyProduct.id,
          title: shopifyProduct.title,
          description: shopifyProduct.body_html,
          price: shopifyProduct.variants[0]?.price || 0,
          sku: shopifyProduct.variants[0]?.sku || '',
          quantity: shopifyProduct.variants[0]?.inventory_quantity || 0,
          images: shopifyProduct.images.map((img: any) => ({
            url: img.src,
            alt: img.alt,
          })),
          category: shopifyProduct.product_type || 'Uncategorized',
          tags: shopifyProduct.tags.split(',').filter((t: string) => t),
          variants: shopifyProduct.variants.map((v: any) => ({
            shopifyVariantId: v.id,
            title: v.title,
            options: {
              option1: v.option1,
              option2: v.option2,
              option3: v.option3,
            },
            price: parseFloat(v.price),
            quantity: v.inventory_quantity,
          })),
          status: shopifyProduct.status === 'active' ? 'active' : 'draft',
        };

        if (existingProduct) {
          await Product.updateOne({ shopifyId: shopifyProduct.id }, productData);
        } else {
          await Product.create(productData);
        }
      }

      res.json({
        message: `Synced ${shopifyProducts.length} products from Shopify`,
        count: shopifyProducts.length,
      });
    } catch (error) {
      res.status(500).json({ error: 'Failed to sync Shopify products' });
    }
  }
}

export default new ProductController();
