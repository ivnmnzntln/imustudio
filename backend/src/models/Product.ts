import mongoose from 'mongoose';

interface IProduct {
  shopifyId: string;
  title: string;
  description: string;
  price: number;
  compareAtPrice?: number;
  cost?: number;
  sku: string;
  barcode?: string;
  quantity: number;
  images: Array<{
    url: string;
    alt?: string;
  }>;
  category: string;
  tags: string[];
  variants: Array<{
    shopifyVariantId: string;
    title: string;
    options: Record<string, string>;
    price: number;
    quantity: number;
  }>;
  status: 'active' | 'draft' | 'archived';
  createdAt: Date;
  updatedAt: Date;
}

const productSchema = new mongoose.Schema<IProduct>(
  {
    shopifyId: { type: String, required: true, unique: true, index: true },
    title: { type: String, required: true, index: true },
    description: { type: String },
    price: { type: Number, required: true },
    compareAtPrice: { type: Number },
    cost: { type: Number },
    sku: { type: String, required: true, unique: true },
    barcode: { type: String },
    quantity: { type: Number, required: true, default: 0 },
    images: [
      {
        url: { type: String, required: true },
        alt: { type: String },
      },
    ],
    category: { type: String, required: true, index: true },
    tags: [{ type: String, index: true }],
    variants: [
      {
        shopifyVariantId: { type: String, required: true },
        title: { type: String },
        options: { type: Map, of: String },
        price: { type: Number },
        quantity: { type: Number },
      },
    ],
    status: {
      type: String,
      enum: ['active', 'draft', 'archived'],
      default: 'active',
      index: true,
    },
  },
  { timestamps: true }
);

productSchema.index({ category: 1, status: 1 });
productSchema.index({ tags: 1 });
productSchema.index({ title: 'text', description: 'text' });

export const Product = mongoose.model<IProduct>('Product', productSchema);
export type { IProduct };
