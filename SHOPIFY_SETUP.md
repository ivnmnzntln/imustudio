# Shopify API Integration Guide

## Getting Your Shopify Credentials

### Step 1: Create a Shopify App

1. Go to **Shopify Admin Dashboard** → https://admin.shopify.com
2. Click **Apps and integrations** (left sidebar)
3. Click **App and sales channel settings**
4. Click **Develop apps for your store**
5. Click **Create an app** button
6. Enter app name: "ShopHub E-Commerce Platform"
7. Click **Create app**

### Step 2: Generate API Credentials

1. In your app settings, go to **Admin API**
2. Click **Manage admin API scopes**

3. Select the following scopes:
   ```
   read_products
   write_products
   read_orders
   write_orders
   read_customers
   write_customers
   read_inventory
   write_inventory
   read_fulfillments
   write_fulfillments
   read_locations
   ```

4. Click **Save** and then **Install app**

5. In the **Admin API credentials** section, you'll find:
   - **Access Token** (keep this secret!)
   - **API Key**
   - **API Password** (under Access Token section)

### Step 3: Get Your Shop Name

Your shop name is in the format: `your-store-name.myshopify.com`

Find it in:
- Shopify Admin Dashboard URL: `https://admin.shopify.com/store/[your-store-name]`
- Or Settings → General → Shop name

## Configuration

### Update Backend .env File

```bash
# backend/.env
SHOPIFY_API_KEY=your_api_key_here
SHOPIFY_API_PASSWORD=your_access_token_here
SHOPIFY_SHOP_NAME=your-store-name.myshopify.com
SHOPIFY_API_VERSION=2024-01
```

**⚠️ IMPORTANT:** Never commit actual credentials to git. Always use `.env` files.

## API Endpoints Explained

### Get All Products from Shopify

```bash
curl -H "X-Shopify-Access-Token: YOUR_TOKEN" \
  "https://your-store.myshopify.com/admin/api/2024-01/products.json"
```

### Create Product in Shopify

```javascript
const product = {
  title: "My Product",
  product_type: "Electronics",
  vendor: "My Company",
  body_html: "Description",
  images: [
    { src: "https://example.com/image.jpg" }
  ],
  variants: [
    {
      title: "Default",
      price: "99.99",
      sku: "SKU-001"
    }
  ]
};
```

### Sync Products API

**Endpoint:** `POST /api/products/sync/shopify`

**Headers:**
```
Authorization: Bearer {admin_jwt_token}
Content-Type: application/json
```

**Response:**
```json
{
  "message": "Synced 50 products from Shopify",
  "count": 50
}
```

This will:
1. Fetch all products from Shopify
2. Create new products in MongoDB
3. Update existing products
4. Preserve product variants and images

## Testing the Connection

### Using curl

```bash
# Test Shopify connection
curl -H "X-Shopify-Access-Token: YOUR_ACCESS_TOKEN" \
  "https://your-store-name.myshopify.com/admin/api/2024-01/shop.json"
```

### Using the API

```bash
# After backend is running, make authenticated request
curl -X POST http://localhost:5000/api/products/sync/shopify \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json"
```

## Supported Operations

### Read Operations
- ✅ Get all products
- ✅ Get single product
- ✅ Get all orders
- ✅ Get single order
- ✅ Get all customers
- ✅ Get shop info
- ✅ Get inventory

### Write Operations
- ✅ Create products
- ✅ Update products
- ✅ Delete products
- ✅ Update order status
- ✅ Create orders
- ✅ Update customer info

## API Version Information

The platform uses Shopify API version **2024-01**. This version includes:
- REST Admin API endpoints
- Latest deprecations handled
- Security improvements
- Performance optimizations

Check the latest version: https://shopify.dev/docs/api/admin-rest

## Environment Variables Reference

```
# Shopify Configuration
SHOPIFY_API_KEY              # Your API Key from app settings
SHOPIFY_API_PASSWORD         # Your Access Token (NOT password)
SHOPIFY_SHOP_NAME           # your-store.myshopify.com
SHOPIFY_API_VERSION         # 2024-01 (or current version)
```

## Troubleshooting

### "Invalid API Key"
**Problem:** API key doesn't match
**Solution:** Verify you're using the correct credentials from app settings

### "Unauthorized"
**Problem:** Access token is invalid or revoked
**Solution:** Regenerate access token in app settings

### "Shop Not Found"
**Problem:** Shop name format is incorrect
**Solution:** Ensure format is `store-name.myshopify.com`

### Products Not Syncing
**Problem:** Products don't appear after sync
**Solution:**
1. Check MongoDB connection
2. Verify admin user has correct role
3. Check backend logs for errors
4. Ensure Shopify products exist in admin

### API Rate Limiting
**Problem:** Getting 429 errors
**Solution:** 
- Shopify allows 2 requests per second
- Add exponential backoff to requests
- Batch operations together

## Rate Limits

Shopify API has these rate limits:
- **REST API:** 2 requests/second
- **GraphQL API:** 100 credits/second

The platform respects these limits with automatic retry logic.

## Security Best Practices

1. **Never share your Access Token**
   - Don't commit to git
   - Don't log it
   - Use environment variables only

2. **Regenerate tokens regularly**
   - Go to app settings
   - Click "Revoke" on old tokens
   - Generate new access token

3. **Use minimal scopes**
   - Only request needed scopes
   - Review permissions regularly
   - Remove unused scopes

4. **Monitor API usage**
   - Check Shopify Admin → Apps → ShopHub
   - Review activity logs
   - Set up alerts for unusual activity

## Advanced Features

### Webhook Setup (Optional)

Register webhooks in Shopify Admin:
1. Settings → Apps and integrations → App and sales channel settings
2. Develop apps → ShopHub → Configuration
3. Admin API credentials → Webhooks
4. Add webhook for events like:
   - `products/create`
   - `products/update`
   - `orders/create`
   - `orders/updated`

## Useful Links

- **Shopify Admin:** https://admin.shopify.com
- **API Documentation:** https://shopify.dev/docs/api
- **API Rate Limits:** https://shopify.dev/docs/api/admin-rest/2024-01#limitations
- **Scopes Reference:** https://shopify.dev/docs/api/admin-rest/2024-01#scopes

## Support

For Shopify API issues:
1. Check Shopify API docs: https://shopify.dev
2. Review error messages in response
3. Check Shopify status page: https://status.shopify.com
4. Contact Shopify support in admin dashboard

---

**Ready to integrate? Follow the quick start guide after setting up your credentials!**
