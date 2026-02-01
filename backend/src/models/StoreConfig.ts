import mongoose from 'mongoose';

interface IStoreConfig {
  storeId: string;
  storeName: string;
  storeSlug: string;
  description?: string;
  logo?: string;
  favicon?: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  themeId: string;
  themeName: string;
  customCSS?: string;
  customJavaScript?: string;
  socialLinks: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
    linkedin?: string;
    pinterest?: string;
    tiktok?: string;
  };
  contact: {
    email: string;
    phone: string;
    address: string;
  };
  seo: {
    metaDescription: string;
    metaKeywords: string[];
    ogImage?: string;
  };
  shopifySettings: {
    shopName: string;
    apiKey: string;
    accessToken: string;
  };
  features: {
    enableReviews: boolean;
    enableWishlist: boolean;
    enableGuestCheckout: boolean;
    enableSubscriptions: boolean;
  };
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const storeConfigSchema = new mongoose.Schema<IStoreConfig>(
  {
    storeId: { type: String, required: true, unique: true, index: true },
    storeName: { type: String, required: true },
    storeSlug: { type: String, required: true, unique: true, lowercase: true },
    description: { type: String },
    logo: { type: String },
    favicon: { type: String },
    primaryColor: { type: String, default: '#000000' },
    secondaryColor: { type: String, default: '#FFFFFF' },
    accentColor: { type: String, default: '#3B82F6' },
    themeId: { type: String, default: 'default' },
    themeName: { type: String, default: 'Default Theme' },
    customCSS: { type: String },
    customJavaScript: { type: String },
    socialLinks: {
      facebook: { type: String },
      instagram: { type: String },
      twitter: { type: String },
      linkedin: { type: String },
      pinterest: { type: String },
      tiktok: { type: String },
    },
    contact: {
      email: { type: String, required: true },
      phone: { type: String, required: true },
      address: { type: String, required: true },
    },
    seo: {
      metaDescription: { type: String, maxlength: 160 },
      metaKeywords: [{ type: String }],
      ogImage: { type: String },
    },
    shopifySettings: {
      shopName: { type: String, required: true },
      apiKey: { type: String, required: true },
      accessToken: { type: String, required: true },
    },
    features: {
      enableReviews: { type: Boolean, default: true },
      enableWishlist: { type: Boolean, default: true },
      enableGuestCheckout: { type: Boolean, default: true },
      enableSubscriptions: { type: Boolean, default: false },
    },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const StoreConfig = mongoose.model<IStoreConfig>('StoreConfig', storeConfigSchema);
export type { IStoreConfig };
