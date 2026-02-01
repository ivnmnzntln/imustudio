# ShopHub - Shopify-Integrated E-Commerce Platform

A production-ready, fully customizable e-commerce platform with complete Shopify API integration. Built with React, Node.js, Express, MongoDB, Stripe, and TypeScript.

## 🎯 Features

### Frontend (React)
- **Modern UI**: Built with React 18, TypeScript, and Tailwind CSS
- **State Management**: Zustand for cart and auth stores
- **Product Catalog**: Browse, search, and filter products
- **Shopping Cart**: Add/remove items with persistent local storage
- **User Authentication**: Register, login, profile management
- **Checkout Flow**: Complete order flow with address and payment info
- **Responsive Design**: Mobile-first, works on all devices

### Backend (Node.js/Express)
- **Shopify Integration**: Full Shopify API connectivity
- **RESTful API**: Comprehensive API endpoints for all features
- **Authentication**: JWT-based user authentication
- **Product Management**: Sync products from Shopify, full CRUD operations
- **Order Management**: Create, read, update orders with status tracking
- **Payment Processing**: Stripe integration for secure payments
- **Database**: MongoDB with Mongoose ORM
- **Middleware**: Auth, error handling, CORS, rate limiting

### Customization Features
- **Customizable Colors**: Primary, secondary, and accent colors
- **Theme System**: Multiple theme support
- **Custom CSS/JavaScript**: Add custom styling and functionality
- **Store Configuration**: Brand, contact info, social links, SEO settings
- **Feature Toggles**: Enable/disable reviews, wishlist, guest checkout, subscriptions

## 📋 Tech Stack

### Backend
- **Runtime**: Node.js 18+
- **Framework**: Express.js 4.18
- **Language**: TypeScript 5
- **Database**: MongoDB 8.0
- **Authentication**: JWT (jsonwebtoken)
- **Payment**: Stripe API
- **Cache**: Redis (optional)
- **File Upload**: Multer with Sharp for image optimization
- **API Integration**: Axios

### Frontend
- **Library**: React 18
- **Language**: TypeScript 5
- **Build Tool**: Vite 5
- **Router**: React Router 6
- **State Management**: Zustand
- **Styling**: Tailwind CSS 3
- **HTTP Client**: Axios

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- MongoDB 5.0+
- npm or yarn

### Installation

1. **Clone and navigate**
```bash
cd /Applications/XAMPP/xamppfiles/htdocs/shopify-ecommerce
```

2. **Install dependencies**
```bash
npm install
```

3. **Setup environment variables**

Backend (.env):
```bash
cp backend/.env.example backend/.env
```

Edit `backend/.env`:
```
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/shopify-ecommerce
JWT_SECRET=your_jwt_secret_key
SHOPIFY_API_KEY=your_shopify_api_key
SHOPIFY_API_PASSWORD=your_shopify_api_password
SHOPIFY_SHOP_NAME=your-shop.myshopify.com
STRIPE_SECRET_KEY=sk_test_your_stripe_key
```

4. **Start development servers**
```bash
npm run dev
```

This will start:
- Backend API: http://localhost:5000
- Frontend: http://localhost:3000

## 📚 API Documentation

### Authentication Endpoints

#### Register
```
POST /api/auth/register
Body: { email, password, firstName, lastName, phone }
```

#### Login
```
POST /api/auth/login
Body: { email, password }
Response: { user, token }
```

#### Get Profile
```
GET /api/auth/profile
Headers: Authorization: Bearer {token}
```

### Product Endpoints

#### Get All Products
```
GET /api/products?page=1&limit=20&category=&search=
```

#### Get Product
```
GET /api/products/:id
```

#### Sync Shopify Products
```
POST /api/products/sync/shopify
Headers: Authorization: Bearer {admin_token}
```

### Order Endpoints

#### Create Order
```
POST /api/orders
Headers: Authorization: Bearer {token}
Body: { items, shippingAddress, billingAddress, paymentMethod }
```

#### Get User Orders
```
GET /api/orders?page=1&limit=10
Headers: Authorization: Bearer {token}
```

#### Get Order
```
GET /api/orders/:id
Headers: Authorization: Bearer {token}
```

#### Update Order Status (Admin)
```
PUT /api/orders/:id
Headers: Authorization: Bearer {admin_token}
Body: { status, trackingNumber }
```

## 🗄️ Database Schema

### Users
- Email, Password (hashed), Name
- Addresses (billing/shipping)
- Role (customer/admin/vendor)
- Preferences (email notifications, newsletter)

### Products
- Shopify ID, Title, Description
- Price, Quantity, SKU
- Images, Category, Tags
- Variants with pricing
- Status (active/draft/archived)

### Orders
- Order Number, Shopify Order ID
- User ID, Items Array
- Addresses (shipping/billing)
- Payment & Status Info
- Timestamps

### StoreConfig
- Store branding (colors, logo, favicon)
- Theme settings
- Custom CSS/JavaScript
- Shopify credentials
- Feature toggles
- SEO metadata

## 🔐 Security Features

- **Password Hashing**: bcryptjs with salt rounds
- **JWT Authentication**: Token-based API authentication
- **HTTPS Ready**: Secure cookie configuration
- **SQL Injection Protection**: Mongoose/MongoDB parameterized queries
- **XSS Protection**: Input sanitization
- **CORS**: Configurable cross-origin requests
- **Rate Limiting**: Request throttling
- **Helmet**: Security headers

## 🎨 Customization Guide

### Change Theme Colors

In `frontend/src/styles/globals.css`:
```css
:root {
  --primary: #000;
  --secondary: #fff;
  --accent: #3b82f6;
}
```

### Add Custom CSS

Update `backend/models/StoreConfig.ts` and add custom CSS to store config:
```javascript
const config = await StoreConfig.findById(storeId);
config.customCSS = `.custom-class { color: red; }`;
```

### Create New Product Filter

Edit `backend/src/controllers/ProductController.ts` and `frontend/src/pages/ProductsPage.tsx` to add new filter logic.

## 📦 Deployment

### Backend (Node.js)
```bash
npm run build
npm start
```

### Frontend (React)
```bash
npm run build
# Deploy dist/ folder to any static hosting
```

### Docker Support (Coming Soon)
Dockerfile templates will be added for containerized deployment.

## 🧪 Testing

### Backend
```bash
npm test --prefix backend
```

### Frontend
```bash
npm test --prefix frontend
```

## 📞 Support & Contributing

- Report bugs and request features via GitHub issues
- Fork and submit pull requests for improvements
- Follow existing code style and patterns

## 📄 License

MIT License - See LICENSE file for details

## 🛣️ Roadmap

- [ ] Admin Dashboard
- [ ] Advanced Analytics
- [ ] Multi-language Support
- [ ] Email Notifications
- [ ] Subscription Products
- [ ] Wishlist Feature
- [ ] Product Reviews & Ratings
- [ ] Inventory Management Dashboard
- [ ] Integration Tests
- [ ] E2E Tests (Cypress)
- [ ] Docker Support
- [ ] CI/CD Pipeline

## 🙏 Acknowledgments

- Shopify API Documentation
- React and Node.js communities
- Stripe for payment processing
- MongoDB for database solutions

---

**Built with ❤️ for modern e-commerce**
