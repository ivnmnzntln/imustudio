import mongoose from 'mongoose';
import { config } from '../config/environment.js';
import { Product } from '../models/Product.js';
import { User } from '../models/User.js';
import { StoreConfig } from '../models/StoreConfig.js';

const seedDatabase = async () => {
  try {
    await mongoose.connect(config.mongodb.uri);
    console.log('✓ Connected to MongoDB');

    // Clear existing data
    await Product.deleteMany({});
    await User.deleteMany({});
    await StoreConfig.deleteMany({});

    // Create sample admin user
    const adminUser = new User({
      email: 'admin@shophub.com',
      password: 'Admin@123',
      firstName: 'Admin',
      lastName: 'User',
      phone: '+1234567890',
      role: 'admin',
      isVerified: true,
      isActive: true,
    });
    await adminUser.save();
    console.log('✓ Created admin user');

    // Create sample customer
    const customerUser = new User({
      email: 'customer@shophub.com',
      password: 'Customer@123',
      firstName: 'John',
      lastName: 'Doe',
      phone: '+1234567891',
      role: 'customer',
      isVerified: true,
      isActive: true,
    });
    await customerUser.save();
    console.log('✓ Created customer user');

    // Create sample products
    const products = [
      {
        shopifyId: '1001',
        title: 'Wireless Headphones',
        description: 'Premium noise-cancelling wireless headphones with 30-hour battery life',
        price: 199.99,
        compareAtPrice: 249.99,
        cost: 80,
        sku: 'WH-001',
        quantity: 50,
        images: [
          {
            url: 'https://via.placeholder.com/300x300?text=Wireless+Headphones',
            alt: 'Wireless Headphones',
          },
        ],
        category: 'Electronics',
        tags: ['audio', 'wireless', 'headphones', 'premium'],
        variants: [
          {
            shopifyVariantId: '1001-1',
            title: 'Black',
            options: { color: 'Black' },
            price: 199.99,
            quantity: 30,
          },
          {
            shopifyVariantId: '1001-2',
            title: 'Silver',
            options: { color: 'Silver' },
            price: 199.99,
            quantity: 20,
          },
        ],
        status: 'active',
      },
      {
        shopifyId: '1002',
        title: 'USB-C Cable',
        description: 'Fast charging USB-C cable compatible with all devices',
        price: 12.99,
        compareAtPrice: 19.99,
        cost: 3,
        sku: 'USB-001',
        quantity: 200,
        images: [
          {
            url: 'https://via.placeholder.com/300x300?text=USB-C+Cable',
            alt: 'USB-C Cable',
          },
        ],
        category: 'Accessories',
        tags: ['cable', 'usb-c', 'charging'],
        variants: [
          {
            shopifyVariantId: '1002-1',
            title: '1m',
            options: { length: '1m' },
            price: 12.99,
            quantity: 100,
          },
          {
            shopifyVariantId: '1002-2',
            title: '2m',
            options: { length: '2m' },
            price: 14.99,
            quantity: 100,
          },
        ],
        status: 'active',
      },
      {
        shopifyId: '1003',
        title: 'Phone Case',
        description: 'Durable protective phone case with premium design',
        price: 24.99,
        compareAtPrice: 35.99,
        cost: 8,
        sku: 'CASE-001',
        quantity: 150,
        images: [
          {
            url: 'https://via.placeholder.com/300x300?text=Phone+Case',
            alt: 'Phone Case',
          },
        ],
        category: 'Accessories',
        tags: ['case', 'protection', 'phone'],
        variants: [
          {
            shopifyVariantId: '1003-1',
            title: 'iPhone 14',
            options: { model: 'iPhone 14' },
            price: 24.99,
            quantity: 75,
          },
          {
            shopifyVariantId: '1003-2',
            title: 'Samsung S23',
            options: { model: 'Samsung S23' },
            price: 24.99,
            quantity: 75,
          },
        ],
        status: 'active',
      },
      {
        shopifyId: '1004',
        title: 'Portable SSD 1TB',
        description: '1TB portable SSD with high-speed data transfer',
        price: 99.99,
        compareAtPrice: 129.99,
        cost: 40,
        sku: 'SSD-001',
        quantity: 30,
        images: [
          {
            url: 'https://via.placeholder.com/300x300?text=Portable+SSD',
            alt: 'Portable SSD',
          },
        ],
        category: 'Electronics',
        tags: ['storage', 'ssd', 'portable'],
        variants: [
          {
            shopifyVariantId: '1004-1',
            title: '512GB',
            options: { capacity: '512GB' },
            price: 49.99,
            quantity: 15,
          },
          {
            shopifyVariantId: '1004-2',
            title: '1TB',
            options: { capacity: '1TB' },
            price: 99.99,
            quantity: 15,
          },
        ],
        status: 'active',
      },
      {
        shopifyId: '1005',
        title: 'Screen Protector',
        description: 'Tempered glass screen protector with anti-glare coating',
        price: 8.99,
        compareAtPrice: 14.99,
        cost: 2,
        sku: 'SP-001',
        quantity: 500,
        images: [
          {
            url: 'https://via.placeholder.com/300x300?text=Screen+Protector',
            alt: 'Screen Protector',
          },
        ],
        category: 'Accessories',
        tags: ['screen', 'protector', 'glass'],
        variants: [
          {
            shopifyVariantId: '1005-1',
            title: 'iPhone 14',
            options: { model: 'iPhone 14' },
            price: 8.99,
            quantity: 250,
          },
          {
            shopifyVariantId: '1005-2',
            title: 'Samsung S23',
            options: { model: 'Samsung S23' },
            price: 8.99,
            quantity: 250,
          },
        ],
        status: 'active',
      },
    ];

    await Product.insertMany(products);
    console.log(`✓ Created ${products.length} sample products`);

    // Create store configuration
    const storeConfig = new StoreConfig({
      storeId: 'store-001',
      storeName: 'ShopHub',
      storeSlug: 'shophub',
      description: 'A modern, customizable Shopify-integrated e-commerce platform',
      primaryColor: '#000000',
      secondaryColor: '#FFFFFF',
      accentColor: '#3B82F6',
      themeId: 'default',
      themeName: 'Default Theme',
      socialLinks: {
        facebook: 'https://facebook.com/shophub',
        instagram: 'https://instagram.com/shophub',
        twitter: 'https://twitter.com/shophub',
      },
      contact: {
        email: 'support@shophub.com',
        phone: '+1234567890',
        address: '123 Main Street, City, Country',
      },
      seo: {
        metaDescription: 'Your Shopify-integrated e-commerce platform with complete customization',
        metaKeywords: ['ecommerce', 'shopify', 'store'],
      },
      shopifySettings: {
        shopName: 'your-shop.myshopify.com',
        apiKey: 'your_api_key',
        accessToken: 'your_access_token',
      },
      features: {
        enableReviews: true,
        enableWishlist: true,
        enableGuestCheckout: true,
        enableSubscriptions: false,
      },
      isActive: true,
    });

    await storeConfig.save();
    console.log('✓ Created store configuration');

    console.log('\n✅ Database seeding completed successfully!');
    console.log('\nTest Credentials:');
    console.log('Admin: admin@shophub.com / Admin@123');
    console.log('Customer: customer@shophub.com / Customer@123');
  } catch (error) {
    console.error('❌ Database seeding failed:', error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log('✓ Disconnected from MongoDB');
  }
};

seedDatabase();
