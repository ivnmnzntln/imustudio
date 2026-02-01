import axios, { AxiosInstance } from 'axios';
import { config } from '../config/environment.js';

interface ShopifyProduct {
  id: string;
  title: string;
  handle: string;
  body_html: string;
  vendor: string;
  product_type: string;
  created_at: string;
  updated_at: string;
  published_at: string;
  tags: string;
  status: string;
  images: Array<{
    id: string;
    alt: string;
    position: number;
    product_id: string;
    created_at: string;
    updated_at: string;
    admin_graphql_api_id: string;
    width: number;
    height: number;
    src: string;
  }>;
  variants: Array<{
    id: string;
    product_id: string;
    title: string;
    price: string;
    sku: string;
    position: number;
    inventory_policy: string;
    compare_at_price: string;
    fulfillment_service: string;
    inventory_management: string;
    option1: string;
    option2: string;
    option3: string;
    created_at: string;
    updated_at: string;
    taxable: boolean;
    barcode: string;
    image_id: string;
    inventory_quantity: number;
    weight: number;
    weight_unit: string;
    old_inventory_quantity: number;
    requires_shipping: boolean;
    admin_graphql_api_id: string;
  }>;
}

interface ShopifyOrder {
  id: string;
  email: string;
  created_at: string;
  updated_at: string;
  number: number;
  user_id: string;
  total_price: string;
  currency: string;
  financial_status: string;
  fulfillment_status: string;
  line_items: Array<{
    id: string;
    variant_id: string;
    title: string;
    quantity: number;
    price: string;
    sku: string;
    product_id: string;
    variant_title: string;
  }>;
  shipping_address: {
    first_name: string;
    last_name: string;
    street: string;
    city: string;
    province: string;
    country: string;
    zip: string;
    phone: string;
  };
}

export class ShopifyService {
  private apiClient: AxiosInstance;
  private shopName: string;
  private apiVersion: string;

  constructor() {
    this.shopName = config.shopify.shopName;
    this.apiVersion = config.shopify.apiVersion;

    this.apiClient = axios.create({
      baseURL: `https://${this.shopName}/admin/api/${this.apiVersion}`,
      headers: {
        'X-Shopify-Access-Token': config.shopify.apiPassword,
        'Content-Type': 'application/json',
      },
    });
  }

  // Product Methods
  async getProducts(params?: Record<string, any>) {
    try {
      const response = await this.apiClient.get<{ products: ShopifyProduct[] }>('/products.json', {
        params: { limit: 250, ...params },
      });
      return response.data.products;
    } catch (error) {
      console.error('Error fetching products from Shopify:', error);
      throw error;
    }
  }

  async getProduct(productId: string) {
    try {
      const response = await this.apiClient.get<{ product: ShopifyProduct }>(
        `/products/${productId}.json`
      );
      return response.data.product;
    } catch (error) {
      console.error(`Error fetching product ${productId}:`, error);
      throw error;
    }
  }

  async createProduct(productData: any) {
    try {
      const response = await this.apiClient.post('/products.json', {
        product: productData,
      });
      return response.data.product;
    } catch (error) {
      console.error('Error creating product:', error);
      throw error;
    }
  }

  async updateProduct(productId: string, productData: any) {
    try {
      const response = await this.apiClient.put(`/products/${productId}.json`, {
        product: productData,
      });
      return response.data.product;
    } catch (error) {
      console.error(`Error updating product ${productId}:`, error);
      throw error;
    }
  }

  async deleteProduct(productId: string) {
    try {
      await this.apiClient.delete(`/products/${productId}.json`);
      return true;
    } catch (error) {
      console.error(`Error deleting product ${productId}:`, error);
      throw error;
    }
  }

  // Order Methods
  async getOrders(params?: Record<string, any>) {
    try {
      const response = await this.apiClient.get<{ orders: ShopifyOrder[] }>('/orders.json', {
        params: { limit: 50, ...params },
      });
      return response.data.orders;
    } catch (error) {
      console.error('Error fetching orders from Shopify:', error);
      throw error;
    }
  }

  async getOrder(orderId: string) {
    try {
      const response = await this.apiClient.get<{ order: ShopifyOrder }>(
        `/orders/${orderId}.json`
      );
      return response.data.order;
    } catch (error) {
      console.error(`Error fetching order ${orderId}:`, error);
      throw error;
    }
  }

  async createOrder(orderData: any) {
    try {
      const response = await this.apiClient.post('/orders.json', {
        order: orderData,
      });
      return response.data.order;
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  }

  async updateOrder(orderId: string, orderData: any) {
    try {
      const response = await this.apiClient.put(`/orders/${orderId}.json`, {
        order: orderData,
      });
      return response.data.order;
    } catch (error) {
      console.error(`Error updating order ${orderId}:`, error);
      throw error;
    }
  }

  // Customer Methods
  async getCustomers(params?: Record<string, any>) {
    try {
      const response = await this.apiClient.get('/customers.json', {
        params: { limit: 250, ...params },
      });
      return response.data.customers;
    } catch (error) {
      console.error('Error fetching customers from Shopify:', error);
      throw error;
    }
  }

  async getCustomer(customerId: string) {
    try {
      const response = await this.apiClient.get(`/customers/${customerId}.json`);
      return response.data.customer;
    } catch (error) {
      console.error(`Error fetching customer ${customerId}:`, error);
      throw error;
    }
  }

  // Shop Info
  async getShopInfo() {
    try {
      const response = await this.apiClient.get('/shop.json');
      return response.data.shop;
    } catch (error) {
      console.error('Error fetching shop info:', error);
      throw error;
    }
  }
}

export default new ShopifyService();
