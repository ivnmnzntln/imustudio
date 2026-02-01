import React, { useState, useEffect } from 'react';
import { productService } from '../services/api';
import { useCart } from '../store/cartStore';

interface Product {
  _id: string;
  title: string;
  price: number;
  images: Array<{ url: string; alt?: string }>;
  description: string;
}

export const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const { addItem } = useCart();

  const handleAddToCart = () => {
    addItem({
      productId: product._id,
      title: product.title,
      price: product.price,
      quantity: 1,
      image: product.images[0]?.url,
    });
    alert('Added to cart!');
  };

  return (
    <div className="card hover:shadow-lg transition-shadow">
      {product.images[0] && (
        <img
          src={product.images[0].url}
          alt={product.title}
          className="w-full h-48 object-cover rounded-lg mb-4"
        />
      )}

      <h3 className="font-bold text-lg mb-2">{product.title}</h3>
      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>

      <div className="flex justify-between items-center">
        <span className="text-2xl font-bold">${product.price}</span>
        <button onClick={handleAddToCart} className="btn-primary">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
