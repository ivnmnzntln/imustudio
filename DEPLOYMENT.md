# Deployment Guide

## Production Checklist

- [ ] Update all environment variables for production
- [ ] Enable HTTPS
- [ ] Set secure JWT and refresh token secrets
- [ ] Configure production database URL
- [ ] Set up Stripe production keys
- [ ] Configure Shopify production credentials
- [ ] Set up monitoring and logging
- [ ] Enable CORS for production domains only
- [ ] Set up SSL certificates
- [ ] Configure CDN for static assets
- [ ] Set up backups for MongoDB
- [ ] Configure email service for notifications

## Backend Deployment

### Option 1: Heroku

```bash
# Install Heroku CLI
brew tap heroku/brew && brew install heroku

# Login to Heroku
heroku login

# Create app
heroku create your-app-name

# Set environment variables
heroku config:set NODE_ENV=production
heroku config:set MONGODB_URI=your_production_mongodb_uri
heroku config:set JWT_SECRET=your_production_jwt_secret
# ... set other environment variables

# Add Procfile
echo "web: npm start" > Procfile

# Deploy
git push heroku main
```

### Option 2: AWS Elastic Beanstalk

```bash
# Install EB CLI
brew install aws-elasticbeanstalk-cli-bundled

# Initialize
eb init -p node.js-18

# Create environment
eb create production-env

# Deploy
eb deploy
```

### Option 3: Docker

```dockerfile
# Dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --only=production

COPY backend ./backend
WORKDIR /app/backend

RUN npm run build

EXPOSE 5000

CMD ["npm", "start"]
```

Build and run:
```bash
docker build -t shopify-ecommerce-backend .
docker run -p 5000:5000 --env-file .env shopify-ecommerce-backend
```

### Option 4: DigitalOcean App Platform

1. Push code to GitHub
2. Connect repository to DigitalOcean
3. Create new app
4. Set environment variables
5. Deploy automatically on push

## Frontend Deployment

### Option 1: Vercel (Recommended for React)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod

# Set environment variables in Vercel dashboard
VITE_API_URL=https://your-api.com/api
```

### Option 2: Netlify

```bash
# Install Netlify CLI
npm i -g netlify-cli

# Deploy
netlify deploy --prod --dir=frontend/dist

# In netlify.toml:
[build]
  command = "npm run build --prefix frontend"
  publish = "frontend/dist"

[dev]
  command = "npm run dev"
  port = 3000
```

### Option 3: AWS S3 + CloudFront

```bash
# Build
npm run build --prefix frontend

# Deploy to S3
aws s3 sync frontend/dist s3://your-bucket-name

# Invalidate CloudFront cache
aws cloudfront create-invalidation --distribution-id YOUR_DIST_ID --paths "/*"
```

### Option 4: GitHub Pages

```bash
# Add to frontend package.json
"homepage": "https://yourusername.github.io/repo-name",
"deploy": "npm run build && gh-pages -d dist"

# Deploy
npm run deploy
```

## Database Migration

### MongoDB Atlas (Recommended)

1. Create account at https://www.mongodb.com/cloud/atlas
2. Create a cluster
3. Create database and collections
4. Get connection string
5. Update `MONGODB_URI` in production environment

### Backup Strategy

```bash
# Backup MongoDB locally
mongodump --uri="mongodb://localhost:27017/shopify-ecommerce" --out ./backup

# Restore MongoDB
mongorestore --uri="mongodb://localhost:27017/shopify-ecommerce" ./backup
```

## Environment Configuration

### Production .env (Backend)

```
NODE_ENV=production
PORT=5000

MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/shopify-ecommerce

JWT_SECRET=your_very_long_random_secure_jwt_secret_string
JWT_EXPIRY=30d

SHOPIFY_API_KEY=production_key
SHOPIFY_API_PASSWORD=production_password
SHOPIFY_SHOP_NAME=your-store.myshopify.com

STRIPE_SECRET_KEY=sk_live_your_live_key
STRIPE_PUBLISHABLE_KEY=pk_live_your_live_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret

FRONTEND_URL=https://yourdomain.com
CORS_ORIGIN=https://yourdomain.com,https://www.yourdomain.com

RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

### Production .env (Frontend)

```
VITE_API_URL=https://api.yourdomain.com/api
```

## SSL/TLS Certificate

### Using Let's Encrypt (Free)

```bash
# Install Certbot
brew install certbot

# Get certificate
sudo certbot certonly --standalone -d yourdomain.com -d www.yourdomain.com

# Auto-renew
sudo certbot renew --dry-run
```

### Using AWS Certificate Manager

1. Go to AWS Console → Certificate Manager
2. Request a new certificate
3. Verify domain ownership
4. Attach to CloudFront or ALB

## Monitoring & Logging

### Backend Monitoring

```bash
# Install PM2
npm i -g pm2

# Start with PM2
pm2 start backend/dist/server.js --name "shopify-api"

# Monitor
pm2 monit

# Save startup script
pm2 startup
pm2 save
```

### Logging Solutions

1. **Winston Logger** (already available)
   ```typescript
   import winston from 'winston';
   ```

2. **Datadog**
   ```bash
   npm i dd-trace
   ```

3. **Sentry** (Error tracking)
   ```bash
   npm i @sentry/node
   ```

## Performance Optimization

### Frontend
- Enable gzip compression
- Minify CSS/JavaScript
- Optimize images with CDN
- Cache static assets
- Use service workers

### Backend
- Enable database indexing
- Set up caching with Redis
- Implement pagination
- Compress API responses
- Use connection pooling

## Security in Production

### HTTPS Only
```
# Redirect HTTP to HTTPS
app.use((req, res, next) => {
  if (req.header('x-forwarded-proto') !== 'https') {
    res.redirect(`https://${req.header('host')}${req.url}`);
  }
  next();
});
```

### CORS Configuration
```typescript
const cors = require('cors');
app.use(cors({
  origin: process.env.CORS_ORIGIN.split(','),
  credentials: true
}));
```

### Rate Limiting
```bash
npm i express-rate-limit
```

### Security Headers
```typescript
const helmet = require('helmet');
app.use(helmet());
```

## Post-Deployment

1. **Test all endpoints**
   ```bash
   curl https://api.yourdomain.com/health
   ```

2. **Monitor error logs**
   - Check CloudWatch/Datadog
   - Monitor Sentry errors
   - Check application logs

3. **Performance testing**
   ```bash
   ab -n 1000 -c 10 https://yourdomain.com/
   ```

4. **Load testing**
   ```bash
   npm i -g artillery
   artillery quick --count 100 --num 1000 https://yourdomain.com/
   ```

5. **Security scan**
   - Run OWASP ZAP
   - Check SSL configuration
   - Verify environment variables are secret

## Rollback Plan

```bash
# Using Heroku
heroku releases
heroku rollback v10

# Using Git
git revert <commit-hash>
git push production main
```

## Scaling Strategy

### Horizontal Scaling
- Load balancer (AWS ALB, Nginx)
- Multiple server instances
- Database replicas

### Vertical Scaling
- Increase server resources
- Optimize database queries
- Enable caching

## Cost Optimization

1. **Use free tier services** (while available)
2. **Set up auto-scaling** based on traffic
3. **Optimize database queries** to reduce calls
4. **Use CDN** for static assets
5. **Clean up unused resources** regularly

---

For detailed deployment instructions, refer to your hosting provider's documentation.
