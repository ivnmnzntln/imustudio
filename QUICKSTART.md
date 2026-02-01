# Quick Start Guide

## Prerequisites
- Node.js 18+ installed
- MongoDB 5.0+ running locally or remote connection string
- npm or yarn package manager

## Step 1: Install Dependencies

```bash
cd /Applications/XAMPP/xamppfiles/htdocs/shopify-ecommerce
npm install
```

This will install all dependencies for both backend and frontend using npm workspaces.

## Step 2: Configure Environment Variables

### Backend Configuration
Copy the example env file:
```bash
cp backend/.env.example backend/.env
```

Edit `backend/.env` with your configuration:
```
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/shopify-ecommerce

JWT_SECRET=your_super_secret_jwt_key_change_this
JWT_EXPIRY=7d

SHOPIFY_API_KEY=your_shopify_api_key
SHOPIFY_API_PASSWORD=your_shopify_api_password
SHOPIFY_SHOP_NAME=your-shop.myshopify.com
SHOPIFY_API_VERSION=2024-01

STRIPE_SECRET_KEY=sk_test_your_test_key
STRIPE_PUBLISHABLE_KEY=pk_test_your_test_key
STRIPE_WEBHOOK_SECRET=whsec_test_secret

FRONTEND_URL=http://localhost:3000
CORS_ORIGIN=http://localhost:3000
```

### Frontend Configuration
Copy the example env file:
```bash
cp frontend/.env.example frontend/.env
```

Edit `frontend/.env` with:
```
VITE_API_URL=http://localhost:5000/api
```

## Step 3: Start MongoDB (if using local)

**macOS with Homebrew:**
```bash
brew services start mongodb-community
```

**Or start MongoDB manually:**
```bash
mongod
```

Verify connection:
```bash
mongosh
# You should see: test>
```

## Step 4: Seed Database (Optional)

Initialize database with sample data:
```bash
npm run seed --prefix backend
```

**Test Accounts Created:**
- Admin: admin@shophub.com / Admin@123
- Customer: customer@shophub.com / Customer@123

## Step 5: Start Development Servers

Run both frontend and backend:
```bash
npm run dev
```

Or run separately:
```bash
# Terminal 1: Backend
npm run backend:dev

# Terminal 2: Frontend
npm run frontend:dev
```

## Step 6: Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **Health Check**: http://localhost:5000/health

## Shopify Integration Setup

1. Go to your Shopify Admin Dashboard
2. Navigate to Apps & integrations → App and sales channel settings
3. Create a custom app and generate API credentials
4. Copy API Key and Password to your `.env` file
5. Use `POST /api/products/sync/shopify` to sync products

## Common Issues & Solutions

### MongoDB Connection Error
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
**Solution**: Ensure MongoDB is running
```bash
brew services start mongodb-community
# or
mongod
```

### Port Already in Use
```
Error: listen EADDRINUSE :::5000
```
**Solution**: Change the port in `.env` or kill existing process
```bash
# macOS/Linux
lsof -i :5000
kill -9 <PID>
```

### CORS Errors
Make sure `CORS_ORIGIN` in `backend/.env` matches your frontend URL:
```
CORS_ORIGIN=http://localhost:3000
```

### npm install Fails
```bash
# Clear cache and reinstall
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

## Development Workflow

1. **Create a feature branch**
   ```bash
   git checkout -b feature/my-feature
   ```

2. **Make changes** in backend or frontend

3. **Test API endpoints** with Postman or curl
   ```bash
   curl http://localhost:5000/health
   ```

4. **Check for errors**
   ```bash
   npm run lint
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

## File Structure Overview

```
shopify-ecommerce/
├── backend/
│   ├── src/
│   │   ├── controllers/     # Business logic
│   │   ├── models/          # MongoDB schemas
│   │   ├── routes/          # API endpoints
│   │   ├── services/        # External API integrations
│   │   ├── middleware/      # Auth, error handling
│   │   ├── config/          # Configuration files
│   │   └── server.ts        # Entry point
│   ├── tests/               # Test files
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── pages/           # Page components
│   │   ├── store/           # Zustand stores
│   │   ├── services/        # API calls
│   │   ├── styles/          # CSS/Tailwind
│   │   ├── App.tsx          # Root component
│   │   └── main.tsx         # Entry point
│   ├── index.html
│   └── package.json
│
└── README.md                # Full documentation
```

## Next Steps

1. **Add your products**: Sync from Shopify or add manually
2. **Customize colors**: Edit theme in store config
3. **Update branding**: Change logo, favicon, colors
4. **Add payment processing**: Configure Stripe webhooks
5. **Deploy**: Follow deployment guide in README.md

## Useful Commands

```bash
# Run backend only
npm run backend:dev

# Run frontend only
npm run frontend:dev

# Build for production
npm run build

# Run tests
npm run test

# Lint code
npm run lint

# Seed database
npm run seed --prefix backend

# Check health
curl http://localhost:5000/health
```

## Getting Help

- Check the README.md for detailed documentation
- Review API endpoints in the README
- Check browser console for frontend errors
- Check terminal for backend errors
- Review Shopify API docs at https://shopify.dev

---

Happy coding! 🚀
