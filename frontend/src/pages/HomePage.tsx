import React from 'react';
import { Link } from 'react-router-dom';

export const HomePage: React.FC = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-black text-white py-20">
        <div className="container text-center">
          <h1 className="text-5xl font-bold mb-4">Welcome to ShopHub</h1>
          <p className="text-xl text-gray-300 mb-8">
            Your Shopify-powered e-commerce platform with complete customization
          </p>
          <Link to="/products" className="btn-primary text-lg">
            Shop Now
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="container py-20">
        <h2 className="text-4xl font-bold text-center mb-12">Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: 'Shopify Integrated', desc: 'Fully integrated with Shopify API' },
            { title: 'Customizable', desc: 'Complete frontend and backend customization' },
            { title: 'Secure Payments', desc: 'Stripe payment processing' },
            { title: 'User Accounts', desc: 'User registration and management' },
            { title: 'Order Tracking', desc: 'Real-time order status tracking' },
            { title: 'Mobile Responsive', desc: 'Works perfectly on all devices' },
          ].map((feature, i) => (
            <div key={i} className="card text-center">
              <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-100 py-20">
        <div className="container text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-gray-600 mb-8">Create an account or start shopping today</p>
          <div className="flex gap-4 justify-center">
            <Link to="/products" className="btn-primary">
              Shop Products
            </Link>
            <Link to="/register" className="btn-secondary">
              Create Account
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
