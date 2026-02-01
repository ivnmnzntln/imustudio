import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-white mt-16 py-12">
      <div className="container grid grid-cols-4 gap-8">
        <div>
          <h3 className="font-bold mb-4">ShopHub</h3>
          <p className="text-gray-400">Your Shopify-powered e-commerce platform</p>
        </div>

        <div>
          <h4 className="font-bold mb-4">Shop</h4>
          <ul className="space-y-2 text-gray-400">
            <li><a href="/products" className="hover:text-white">All Products</a></li>
            <li><a href="/new" className="hover:text-white">New Arrivals</a></li>
            <li><a href="/sale" className="hover:text-white">Sale</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold mb-4">Company</h4>
          <ul className="space-y-2 text-gray-400">
            <li><a href="/about" className="hover:text-white">About</a></li>
            <li><a href="/contact" className="hover:text-white">Contact</a></li>
            <li><a href="/faq" className="hover:text-white">FAQ</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold mb-4">Legal</h4>
          <ul className="space-y-2 text-gray-400">
            <li><a href="/privacy" className="hover:text-white">Privacy</a></li>
            <li><a href="/terms" className="hover:text-white">Terms</a></li>
            <li><a href="/returns" className="hover:text-white">Returns</a></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
        <p>&copy; 2024 ShopHub. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
